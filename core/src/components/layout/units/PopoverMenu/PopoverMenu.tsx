import type {FunctionComponent} from 'react';
import {PlayerMenuProps} from './types';
import {Popover} from '../Popover';
import {memo} from 'react';

const PopoverMenuComponent: FunctionComponent<PlayerMenuProps> = (props) => {
  const {children, ...popoverProps} = props;

  return (
    <Popover childrenClassname="player-menu-holder" {...popoverProps} theme="menu" arrow={false} interactive={true}>
      {children}
    </Popover>
  );
};

export const PopoverMenu = memo(PopoverMenuComponent);
