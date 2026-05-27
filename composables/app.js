import { state, categoryEmojis } from './state.js';
import { initTabBars } from '../components/tabBar.js';
import { formatCurrency, showToast } from './ui.js';

function show(name) {
  document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
  const target = document.getElementById(`screen-${name}`);
  if (!target) {
    return;
  }

  target.classList.add('active');
  document.querySelectorAll('.thumb').forEach((item) => {
    item.classList.toggle('active', item.dataset.screen === name);
  });

  const body = target.querySelector('.screen-body');
  if (body) {
    body.scrollTop = 0;
  }

  if (name === 'add') {
    state.amountInput = '';
    state.selectedCategory = 'Food';
    state.selectedType = 'expense';
    renderAmount();
    document.querySelectorAll('#cat-grid .cat-item').forEach((item) => item.classList.toggle('on', item.dataset.cat === 'Food'));
    document.querySelectorAll('#type-segment .seg').forEach((seg) => seg.classList.toggle('on', seg.dataset.type === 'expense'));
  }
}

function formatHexToRgba(hex, alpha = 0.12) {
  const cleaned = hex.replace('#', '');
  if (cleaned.length !== 6) {
    return 'var(--anino-2)';
  }

  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function setupPeek() {
  document.querySelectorAll('.peek-target').forEach((element) => {
    const start = () => {
      if (!state.privacyMode) {
        return;
      }
      element.__peekTimer = setTimeout(() => element.classList.add('peek'), 250);
    };

    const end = () => {
      clearTimeout(element.__peekTimer);
      element.classList.remove('peek');
    };

    element.addEventListener('mousedown', start);
    element.addEventListener('touchstart', start);
    element.addEventListener('mouseup', end);
    element.addEventListener('mouseleave', end);
    element.addEventListener('touchend', end);
  });
}

function renderAmount() {
  const el = document.getElementById('amount-display');
  if (!el) {
    return;
  }

  if (!state.amountInput) {
    el.innerHTML = '<span class="currency">₱</span>0';
    el.classList.add('zero');
    return;
  }

  el.innerHTML = `<span class="currency">₱</span>${formatCurrency(parseInt(state.amountInput))}`;
  el.classList.remove('zero');
}

function bindGlobalFunctions() {
  window.togglePrivacy = togglePrivacy;
  window.toggleTheme = toggleTheme;
  window.saveTransaction = saveTransaction;
  window.deleteTransaction = deleteTransaction;
  window.openAccountDetail = openAccountDetail;
  window.openTransactionDetail = openTransactionDetail;
}

function attachEventListeners() {
  document.body.addEventListener('click', (event) => {
    const goElement = event.target.closest('[data-go]');
    if (goElement) {
      event.preventDefault();
      show(goElement.dataset.go);
      return;
    }

    const thumb = event.target.closest('.thumb');
    if (thumb && thumb.dataset.screen) {
      show(thumb.dataset.screen);
    }
  });

  document.querySelectorAll('.keypad .key').forEach((key) => {
    key.addEventListener('click', () => {
      const value = key.dataset.key;
      if (value === 'clear') {
        state.amountInput = '';
      } else if (value === 'back') {
        state.amountInput = state.amountInput.slice(0, -1);
      } else if (state.amountInput.length < 7) {
        state.amountInput += value;
      }
      renderAmount();
    });
  });

  document.querySelectorAll('#cat-grid .cat-item').forEach((item) => {
    item.addEventListener('click', () => {
      document.querySelectorAll('#cat-grid .cat-item').forEach((node) => node.classList.remove('on'));
      item.classList.add('on');
      state.selectedCategory = item.dataset.cat;
    });
  });

  document.querySelectorAll('#type-segment .seg').forEach((segment) => {
    segment.addEventListener('click', () => {
      document.querySelectorAll('#type-segment .seg').forEach((node) => node.classList.remove('on'));
      segment.classList.add('on');
      state.selectedType = segment.dataset.type;
    });
  });

  const slider = document.getElementById('ef-slider');
  if (slider) {
    slider.addEventListener('input', (event) => {
      handleEmergencySlider(parseInt(event.target.value, 10));
    });
  }

  document.querySelectorAll('.plan-card').forEach((plan) => {
    plan.addEventListener('click', () => {
      document.querySelectorAll('.plan-card').forEach((node) => node.classList.remove('on'));
      plan.classList.add('on');
    });
  });
}

function togglePrivacy() {
  state.privacyMode = !state.privacyMode;
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.toggle('privacy-on', state.privacyMode);
  });

  const eyeIcon = document.getElementById('eye-icon');
  if (eyeIcon) {
    eyeIcon.innerHTML = state.privacyMode
      ? '<path d="M2 2l20 20M9.88 9.88a3 3 0 0 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>'
      : '<circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>';
  }

  const privacyToggle = document.getElementById('privacy-menu-toggle');
  if (privacyToggle) {
    privacyToggle.classList.toggle('on', state.privacyMode);
  }

  showToast(state.privacyMode ? 'Privacy mode on' : 'Privacy mode off');
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  const device = document.getElementById('device');
  if (device) {
    device.classList.toggle('theme-light', state.theme === 'light');
  }
  const themeToggle = document.getElementById('theme-menu-toggle');
  if (themeToggle) {
    themeToggle.classList.toggle('on', state.theme === 'light');
  }
  showToast(state.theme === 'light' ? 'Light theme on' : 'Dark theme on');
}

function saveTransaction() {
  const amount = parseInt(state.amountInput, 10) || 0;
  if (amount === 0) {
    showToast('Enter an amount first');
    return;
  }

  const signedAmount = state.selectedType === 'income' ? amount : -amount;
  state.transactions.unshift({
    id: Date.now(),
    name: `${state.selectedCategory}${state.selectedType === 'income' ? ' Income' : ' Purchase'}`,
    emoji: categoryEmojis[state.selectedCategory] || '💸',
    category: state.selectedCategory,
    account: 'BPI Credit · Just now',
    amount: signedAmount,
  });

  state.netWorth += signedAmount;
  if (signedAmount < 0) {
    state.monthSpent += Math.abs(signedAmount);
  }

  renderDashboard();
  show('dashboard');
  setTimeout(() => showToast(state.selectedType === 'income' ? 'Income recorded' : 'Transaction saved'), 250);
}

function openTransactionDetail(txn) {
  state.currentTxn = txn;
  const icon = document.getElementById('txn-d-icon');
  const name = document.getElementById('txn-d-name');
  const category = document.getElementById('txn-d-cat');
  const amount = document.getElementById('txn-d-amt');

  if (icon) icon.textContent = txn.emoji;
  if (name) name.textContent = txn.name;
  if (category) category.textContent = `${txn.category} · ${txn.account.split(' · ')[0]}`;

  if (amount) {
    amount.textContent = `${txn.amount > 0 ? '+₱ ' : '−₱ '}${formatCurrency(Math.abs(txn.amount))}`;
    amount.classList.toggle('inc', txn.amount > 0);
    amount.classList.toggle('exp', txn.amount < 0);
  }

  show('txn-detail');
}

function deleteTransaction() {
  if (!state.currentTxn) {
    return;
  }

  const index = state.transactions.findIndex((item) => item.id === state.currentTxn.id);
  if (index > -1) {
    const removed = state.transactions.splice(index, 1)[0];
    state.netWorth -= removed.amount;
    if (removed.amount < 0) {
      state.monthSpent -= Math.abs(removed.amount);
    }
    renderDashboard();
  }

  show('dashboard');
  setTimeout(() => showToast('Transaction deleted'), 250);
}

function openAccountDetail(name, type, amount, iconText, iconColor) {
  const title = document.getElementById('ad-title');
  const accountName = document.getElementById('ad-name');
  const accountNum = document.getElementById('ad-num');
  const accountAmt = document.getElementById('ad-amt');
  const icon = document.getElementById('ad-icon');

  if (title) title.textContent = name;
  if (accountName) accountName.textContent = name;
  if (accountNum) accountNum.textContent = type;
  if (accountAmt) accountAmt.textContent = `₱ ${amount}`;
  if (icon) {
    icon.textContent = iconText;
    if (iconColor && iconColor.startsWith('#')) {
      icon.style.background = formatHexToRgba(iconColor, 0.12);
      icon.style.color = iconColor;
    } else {
      icon.style.background = 'var(--anino-2)';
      icon.style.color = '';
    }
  }

  show('account-detail');
}

function renderDashboard() {
  const netWorth = document.getElementById('nw-value');
  const monthSpent = document.getElementById('month-spent');
  const txnList = document.getElementById('txn-list');

  if (netWorth) {
    netWorth.textContent = `₱ ${formatCurrency(state.netWorth)}`;
  }

  if (monthSpent) {
    monthSpent.textContent = `₱ ${formatCurrency(state.monthSpent)}`;
  }

  if (!txnList) {
    return;
  }

  txnList.innerHTML = state.transactions.slice(0, 5).map((txn) => {
    const value = txn.amount > 0 ? `+₱ ${formatCurrency(txn.amount)}` : `−₱ ${formatCurrency(Math.abs(txn.amount))}`;
    const cls = txn.amount > 0 ? 'inc' : 'exp';
    const payload = JSON.stringify(txn).replace(/'/g, '&#39;');

    return `
      <div class="txn-item" onclick='openTransactionDetail(${payload})'>
        <div class="txn-icon">${txn.emoji}</div>
        <div class="txn-body">
          <div class="txn-name">${txn.name}</div>
          <div class="txn-meta">${txn.category} · ${txn.account}</div>
        </div>
        <div class="txn-amount ${cls}">${value}</div>
      </div>
    `;
  }).join('');
}

function handleEmergencySlider(months) {
  const dailyAvg = 820;
  const current = 167200;
  const target = months * 30 * dailyAvg;
  const pct = Math.min(Math.round((current / target) * 100), 100);
  const monthsCovered = (current / (dailyAvg * 30)).toFixed(1);
  const monthsToGo = Math.max(0, ((target - current) / 10000)).toFixed(1);
  const efTarget = document.getElementById('ef-target-val');
  const efPct = document.getElementById('ef-pct');
  const efHeadline = document.getElementById('ef-headline');
  const efProgress = document.getElementById('ef-progress');
  const efMonths = document.getElementById('ef-months-to-go');
  const efTip = document.getElementById('ef-tip');
  const ring = document.getElementById('ef-ring');
  const circumference = 263.89;

  if (efTarget) efTarget.textContent = String(months);
  if (efPct) efPct.textContent = `${pct}%`;
  if (efHeadline) efHeadline.textContent = `${monthsCovered} of ${months} months saved`;
  if (efProgress) efProgress.textContent = `₱ ${formatCurrency(current)} of ₱ ${formatCurrency(target)} target`;
  if (efMonths) efMonths.textContent = monthsToGo;
  if (efTip) {
    efTip.textContent = `Your target updates automatically as your spending changes. Right now you spend an average of ₱${dailyAvg} per day, so ${months} ${months === 1 ? 'month' : 'months'} of cushion means ₱${formatCurrency(target)}. If your spending drops, the target drops with it.`;
  }
  if (ring) ring.style.strokeDashoffset = String(circumference * (1 - pct / 100));
}

export function initApp() {
  initTabBars();
  renderDashboard();
  setupPeek();
  renderAmount();
  bindGlobalFunctions();
  attachEventListeners();
  show('welcome');
}
