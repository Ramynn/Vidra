export const findElementLeftPosition = (element: HTMLElement): number => {
  let box;

  if (element.getBoundingClientRect && element.parentNode) {
    box = element.getBoundingClientRect();
  }

  if (!box) {
    return 0;
  }

  return Math.round(
    box.left +
      (window.pageXOffset || document.body.scrollLeft) -
      (document.documentElement.clientLeft || document.body.clientLeft || 0),
  );
};

export const getPointerPosition = (element: HTMLElement, event: MouseEvent | TouchEvent): number => {
  const elementPosition = findElementLeftPosition(element);
  const pageX: number = (event as TouchEvent).changedTouches
    ? (event as TouchEvent).changedTouches[0].pageX
    : (event as MouseEvent).pageX;

  return Math.max(0, Math.min(1, (pageX - elementPosition) / element.offsetWidth));
};

export const getIsTouchDevice = (): boolean => {
  return (
    'ontouchstart' in window ||
    !!navigator?.maxTouchPoints ||
    !!(navigator as Navigator & {msMaxTouchPoints: number})?.msMaxTouchPoints
  );
};
