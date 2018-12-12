export function showSprite(x,y) {
  const messageEl = document.createElement('div');
  messageEl.textContent = x + ',' + y;
  document.body.appendChild(messageEl);
}