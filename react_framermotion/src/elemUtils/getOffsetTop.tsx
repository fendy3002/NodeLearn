export function getOffsetTop(el: any) {
  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = el.getBoundingClientRect();
  return elemRect.top - bodyRect.top;
}
