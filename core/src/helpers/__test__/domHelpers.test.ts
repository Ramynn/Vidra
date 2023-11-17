import {findElementLeftPosition} from '../domHelpers';

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
});
