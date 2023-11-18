import {ReactNode} from 'react';
import {SeekbarEventType} from '../../../../types';

export interface SliderProps {
  onMouseDown?: (event: SeekbarEventType) => void;
  onMouseMove?: (event: SeekbarEventType) => void;
  onMouseUp?: (event: SeekbarEventType) => void;
  onClick?: (event: Event | MouseEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onActiveChange?: (active: boolean) => void;
  className?: string;
  children?: ReactNode[] | ReactNode;
}

export type SliderRefImperative = {
  calculateDistance: (event: MouseEvent | TouchEvent) => number;
};
