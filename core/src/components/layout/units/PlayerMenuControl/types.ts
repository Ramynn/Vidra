import {FunctionComponent, ReactNode} from 'react';
import {KeyPressListener} from '../PlayerControl/types';
import {TooltipProps} from '../Tooltip/types';

export type ControlMenuComponentType = FunctionComponent<{
  handleClose: () => void;
  children?: ReactNode;
}>;

export interface MenuControlProps {
  keyPressListener?: KeyPressListener;
  tooltip?: string;
  tooltipProps?: Omit<TooltipProps, 'content' | 'ref' | 'visible' | 'placement'>;
  component: ControlMenuComponentType;
  name: string;
  children: ReactNode;
}
