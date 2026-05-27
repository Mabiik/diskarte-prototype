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
  if (!device) return;

  if (window.innerWidth <= 960) {
    const availableHeight = window.innerHeight - 220;
    const heightScale = availableHeight / 844;
    const availableWidth = window.innerWidth - 40;
    const widthScale = availableWidth / 390;
    const scale = Math.min(heightScale, widthScale, 1);
    const finalScale = Math.max(scale, 0.4);

    // Calculate excess height (for vertical flow)
    const excessHeight = (1 - finalScale) * 844;
    
    // Calculate excess width created by the scaling
    const excessWidth = (1 - finalScale) * 390;

    document.documentElement.style.setProperty('--device-scale', finalScale.toFixed(3));
    
    // Fix vertical layout shifting
    device.style.marginBottom = `-${excessHeight.toFixed(0)}px`;
    
    // Split the excess width perfectly between left and right to force center alignment
    const halfExcessWidth = (excessWidth / 2).toFixed(0);
    device.style.marginLeft = `-${halfExcessWidth}px`;
    device.style.marginRight = `-${halfExcessWidth}px`;
    
  } else {
    document.documentElement.style.removeProperty('--device-scale');
    device.style.marginBottom = '';
    device.style.marginLeft = '';
    device.style.marginRight = '';
  }
}

updateDeviceScale();
window.addEventListener('resize', updateDeviceScale);