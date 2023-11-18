import type {
  HTMLProps,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  ForwardRefRenderFunction,
} from 'react';
import {forwardRef, memo, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {SliderProps, SliderRefImperative} from './types';
import {getIsTouchDevice, getPointerPosition} from '../../../../helpers';
import {SeekbarEventType} from '../../../../types';
import clsx from 'clsx';

// TODO: improve performance and code quality
const PlayerSliderComponent: ForwardRefRenderFunction<SliderRefImperative, SliderProps> = (props, ref) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = getIsTouchDevice();

  useImperativeHandle(ref, () => ({
    calculateDistance(event): number {
      return getPointerPosition(sliderRef.current!, event);
    },
  }));

  const handleMouseMove = (event: Event): void => {
    if (props.onMouseMove) {
      props.onMouseMove(event);
    }
  };

  const handleActivateStateChange = (state: boolean): void => {
    setIsActive(state);

    if (props.onActiveChange) {
      props.onActiveChange(state);
    }
  };

  const handleClick = (event: Event | ReactMouseEvent<HTMLDivElement>): void => {
    if (event.type === 'contextmenu') {
      return;
    }

    if (props.onClick) {
      props.onClick(event as Event);
    }
  };

  const handleMouseUp = (event: SeekbarEventType): void => {
    document.removeEventListener('mousemove', handleMouseMove, true);
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousedown', handleMouseMove, true);

    if (isTouchDevice) {
      document.removeEventListener('touchmove', handleMouseMove, true);
      document.removeEventListener('touchend', handleMouseUp, true);
    }

    handleActivateStateChange(false);

    if (props.onMouseUp) {
      props.onMouseUp(event);
    }
  };

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement> | Event): void => {
    document.addEventListener('mousemove', handleMouseMove, true);
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('mousedown', handleMouseMove, true);

    if (isTouchDevice) {
      document.addEventListener('touchmove', handleMouseMove, true);
      document.addEventListener('touchend', handleMouseUp, true);
    }

    handleActivateStateChange(true);
    handleMouseMove(event as Event);

    if (props.onMouseDown) {
      props.onMouseDown(event as Event);
    }
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement> | Event): void => {
    handleMouseDown(event as Event);
  };

  const className = clsx(
    'player-slider',
    {
      'player-slider-sliding': isActive,
    },
    props.className,
  );

  // TODO: remove unused memorized methods
  const connectors = useMemo<HTMLProps<HTMLDivElement>>(() => {
    const methods: HTMLProps<HTMLDivElement> = {
      onMouseDown: handleMouseDown,
      onFocus: props.onFocus,
      onBlur: props.onBlur,
      onClick: handleClick,
    };

    if (isTouchDevice) {
      methods.onTouchStart = handleTouchStart;
    }

    return methods;
  }, [isTouchDevice, handleTouchStart, handleClick, handleMouseDown]);

  return (
    <div ref={sliderRef} className={className} {...connectors}>
      {props.children}
    </div>
  );
};

export const Slider = memo(forwardRef(PlayerSliderComponent));
