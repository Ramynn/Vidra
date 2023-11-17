import {isFullscreen, fullscreenAddEventListener, fullscreenRemoveEventListener} from '../screenHelpers';

describe('Fullscreen Utilities', () => {
  const originalFullscreenElement = (document as any).fullscreenElement;
  const originalWebkitFullscreenElement = document.webkitFullscreenElement;
  const originalMozFullScreenElement = document.mozFullScreenElement;
  const originalMsFullscreenElement = document.msFullscreenElement;

  afterEach(() => {
    (document as any).fullscreenElement = originalFullscreenElement;
    document.webkitFullscreenElement = originalWebkitFullscreenElement;
    document.mozFullScreenElement = originalMozFullScreenElement;
    document.msFullscreenElement = originalMsFullscreenElement;
  });

  describe('isFullscreen', () => {
    it('should return true when any fullscreen element is present', () => {
      (document as any).fullscreenElement = document.body;
      expect(isFullscreen()).toBe(true);
    });

    it('should return false when no fullscreen element is present', () => {
      (document as any).fullscreenElement = null;
      expect(isFullscreen()).toBe(false);
    });
  });

  describe('addEventListener', () => {
    it('should add event listeners for fullscreenchange events', () => {
      const handler = jest.fn();
      fullscreenAddEventListener(handler);

      document.dispatchEvent(new Event('fullscreenchange'));
      expect(handler).toHaveBeenCalled();
    });
  });

  describe('removeEventListener', () => {
    it('should remove event listeners for fullscreenchange events', () => {
      const handler = jest.fn();
      fullscreenAddEventListener(handler);
      fullscreenRemoveEventListener(handler);

      document.dispatchEvent(new Event('fullscreenchange'));
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
