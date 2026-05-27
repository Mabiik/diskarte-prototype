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
    // 1. Calculate available height (Viewport height minus approx 220px for tabs/nav/padding)
    const availableHeight = window.innerHeight - 220; 
    const heightScale = availableHeight / 844;

    // 2. Calculate available width (Viewport width minus 40px for side padding)
    const availableWidth = window.innerWidth - 40;
    const widthScale = availableWidth / 390;

    // 3. Choose the stricter scale so it fits perfectly both ways, capped at 1
    const scale = Math.min(heightScale, widthScale, 1);
    
    // 4. Set a minimum scale limit (e.g., 0.4) so it doesn't shrink into oblivion
    const finalScale = Math.max(scale, 0.4);

    document.documentElement.style.setProperty('--device-scale', finalScale.toFixed(3));
  } else {
    document.documentElement.style.removeProperty('--device-scale');
  }
}
updateDeviceScale();
window.addEventListener('resize', updateDeviceScale);