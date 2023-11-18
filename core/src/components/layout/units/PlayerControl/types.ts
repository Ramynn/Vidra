import {ReactNode} from 'react';
import {TooltipProps} from '../Tooltip/types';

export interface KeyPressListener {
  key: string[] | string;
  label: string;
}

export interface ControlProps {
  tooltip?: string;
  keyPressListener?: KeyPressListener;
  onClick: () => void;
  tooltipProps?: Omit<TooltipProps, 'content'>;
  children?: ReactNode;
}
