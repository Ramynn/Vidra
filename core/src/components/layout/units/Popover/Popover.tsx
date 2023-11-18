import type {FunctionComponent} from 'react';
import Tippy from '@tippyjs/react';
import {memo} from 'react';
import {PopoverProps} from './types';

export const PopoverComponent: FunctionComponent<PopoverProps> = (props) => {
  const {children, childrenClassname = 'player-popover-holder', trigger, zIndex = 10, ...popoverProps} = props;
  // TODO: usePlayer() is not defined
  // const rootRef = usePlayer();
  // const target = props.appendTo ?? (rootRef?.rootRef?.current?.querySelector('.player-controls') as HTMLElement);
  // appendTo={target}

  return (
    <Tippy {...popoverProps} animation={false} trigger={trigger} zIndex={zIndex}>
      <div className={childrenClassname}>{children}</div>
    </Tippy>
  );
};

export const Popover = memo(PopoverComponent);
