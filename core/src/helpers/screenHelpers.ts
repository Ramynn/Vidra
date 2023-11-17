declare global {
  interface Document {
    webkitExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    msExitFullscreen?: () => void;
    webkitFullscreenEnabled?: boolean;
    mozFullScreenEnabled?: boolean;
    msFullscreenEnabled?: boolean;
    webkitFullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
    msFullscreenElement?: Element | null;
  }
}

export type HTMLElementWithBrowserMethods = HTMLElement & {
  requestFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
};

export const isFullscreen = (): boolean => {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
};

export const enabledFullscreen = (): boolean => {
  return !!(
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
  );
};

export const requestFullscreen = (target: HTMLElement | HTMLElementWithBrowserMethods): void => {
  const element: HTMLElementWithBrowserMethods = target as HTMLElementWithBrowserMethods;

  if (element.requestFullscreen) {
    void element.requestFullscreen();

    return;
  }

  if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();

    return;
  }

  if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();

    return;
  }

  if (element.msRequestFullscreen) {
    element.msRequestFullscreen();

    return;
  }
};

export const exit = (): void => {
  if (!isFullscreen()) {
    return;
  }

  if (document.exitFullscreen) {
    void document.exitFullscreen();

    return;
  }

  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();

    return;
  }

  if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();

    return;
  }

  if (document.msExitFullscreen) {
    document.msExitFullscreen();

    return;
  }
};

export const fullscreenAddEventListener = (handler: () => void): void => {
  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  document.addEventListener('mozfullscreenchange', handler);
  document.addEventListener('MSFullscreenChange', handler);
};

export const fullscreenRemoveEventListener = (handler: () => void): void => {
  document.removeEventListener('fullscreenchange', handler);
  document.removeEventListener('webkitfullscreenchange', handler);
  document.removeEventListener('mozfullscreenchange', handler);
  document.removeEventListener('MSFullscreenChange', handler);
};
