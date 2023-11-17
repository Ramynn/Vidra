import {findElementLeftPosition, getPointerPosition} from '../domHelpers';

describe('findElementLeftPosition', () => {
  it('should return 0 for an element without a parent', () => {
    const element = document.createElement('div');
    const leftPosition = findElementLeftPosition(element);
    expect(leftPosition).toEqual(0);
  });

  it('should calculate the correct left position with a parent element', () => {
    const parentElement = document.createElement('div');
    const childElement = document.createElement('div');
    parentElement.appendChild(childElement);
    document.body.appendChild(parentElement);

    const leftPosition = findElementLeftPosition(childElement);
    expect(leftPosition).toBeGreaterThanOrEqual(0);

    document.body.removeChild(parentElement);
  });

  it('should handle missing getBoundingClientRect method', () => {
    const element = {
      parentNode: document.createElement('div'),
    } as any;

    const leftPosition = findElementLeftPosition(element);
    expect(leftPosition).toEqual(0);
  });

  // Add more test cases based on your specific scenarios...
});

describe('getPointerPosition', () => {
  it('should calculate the correct pointer position within the element', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    document.body.appendChild(element);

    const event = new MouseEvent('click', {pageX: 50} as any);
    const pointerPosition = getPointerPosition(element, event);
    expect(pointerPosition).toBeCloseTo(0.5, 2);

    document.body.removeChild(element);
  });

  it('should handle TouchEvent and calculate the correct pointer position', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    document.body.appendChild(element);

    const touchEvent = new TouchEvent('touchstart', {
      touches: [{pageX: 25} as any],
    });

    const pointerPosition = getPointerPosition(element, touchEvent);
    expect(pointerPosition).toBeCloseTo(0.25, 2);

    document.body.removeChild(element);
  });

  it('should handle pointer position outside the element bounds', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    document.body.appendChild(element);

    const event = new MouseEvent('click', {pageX: 150} as any);
    const pointerPosition = getPointerPosition(element, event);
    expect(pointerPosition).toEqual(1);

    document.body.removeChild(element);
  });
});
