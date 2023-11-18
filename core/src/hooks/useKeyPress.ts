import {useEffect} from 'react';
import {isDefined} from '../helpers';

export const useKeyPress = (
  keyCode: string[] | string | null,
  onKeyUp?: () => void,
  onKeyDown?: () => void,
  stopPropagation?: boolean,
): void => {
  function downHandler(event: KeyboardEvent): void {
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!isDefined(keyCode) || !onKeyDown) {
      return;
    }

    if (Array.isArray(keyCode)) {
      if (keyCode.includes(event.code) || keyCode.includes(event.key)) {
        onKeyDown();
      }

      return;
    }

    if (event.code === keyCode || event.key === keyCode) {
      onKeyDown();
    }
  }

  const upHandler = (event: KeyboardEvent): void => {
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!isDefined(keyCode) || !onKeyUp) {
      return;
    }

    if (Array.isArray(keyCode)) {
      if (keyCode.includes(event.code) || keyCode.includes(event.key)) {
        onKeyUp();
      }

      return;
    }

    if (event.code === keyCode || event.key === keyCode) {
      onKeyUp();
    }
  };

  useEffect(() => {
    if (isDefined(keyCode)) {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
    }

    return (): void => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keyCode]);
};
