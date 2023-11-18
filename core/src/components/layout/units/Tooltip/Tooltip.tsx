import type {FunctionComponent} from 'react';
import {memo} from 'react';
import {TooltipProps} from './types';
import {Popover} from '../Popover';

export const TooltipComponent: FunctionComponent<TooltipProps> = (props) => {
  const {children, ...popoverProps} = props;

  return (
    <Popover childrenClassname="player-tooltip-holder" {...popoverProps} trigger="mouseenter focus">
      {children}
    </Popover>
  );
};

export const Tooltip = memo(TooltipComponent);
