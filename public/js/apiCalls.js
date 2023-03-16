function showMessage(type, message) {
  const messageDiv = document.querySelector('#message');
  messageDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}
