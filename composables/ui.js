let toastTimer = null;

export function formatCurrency(value) {
  return value.toLocaleString('en-US');
}

export function showToast(message) {
  const toastMsg = document.getElementById('toast-msg');
  const toastContainer = document.getElementById('toast');
  if (!toastMsg || !toastContainer) {
    return;
  }

  toastMsg.textContent = message;
  toastContainer.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastContainer.classList.remove('show'), 2200);
}

function updateDeviceScale() {
  if (window.innerWidth <= 960) {
    const availableHeight = window.innerHeight - 180;
    const scale = Math.min(availableHeight / 844, 1);
    document.documentElement.style.setProperty('--device-scale', scale.toFixed(3));
  } else {
    document.documentElement.style.removeProperty('--device-scale');
  }
}

updateDeviceScale();
window.addEventListener('resize', updateDeviceScale);