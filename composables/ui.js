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
  const device = document.getElementById('device');
  if (window.innerWidth <= 960) {
    const availableHeight = window.innerHeight - 220;
    const heightScale = availableHeight / 844;
    const availableWidth = window.innerWidth - 40;
    const widthScale = availableWidth / 390;
    const scale = Math.min(heightScale, widthScale, 1);
    const finalScale = Math.max(scale, 0.4);

 
    const excessHeight = (1 - finalScale) * 844;

    document.documentElement.style.setProperty('--device-scale', finalScale.toFixed(3));
    device.style.marginBottom = `-${excessHeight.toFixed(0)}px`;
  } else {
    document.documentElement.style.removeProperty('--device-scale');
    device.style.marginBottom = '';
  }
}
updateDeviceScale();
window.addEventListener('resize', updateDeviceScale);