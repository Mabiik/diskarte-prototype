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
