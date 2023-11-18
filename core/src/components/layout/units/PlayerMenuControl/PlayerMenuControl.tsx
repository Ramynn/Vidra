import type {FunctionComponent, ReactNode} from 'react';
import {useMemo, useState} from 'react';
import {ControlMenuComponentType, MenuControlProps} from './types';
import {PlayerMenuProps} from '../PopoverMenu/types';
import {PopoverMenu} from '../PopoverMenu';
import {PlayerControl} from '../PlayerControl';

export const PlayerMenuControl: FunctionComponent<MenuControlProps> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // TODO: implement usePlayerActivitySetter hook
  // const setActivity = usePlayerActivitySetter(props.name);

  const handleControlClick = (): void => {
    setIsVisible((prevState) => {
      // setActivity(!prevState);

      return !prevState;
    });
  };

  const handleOutsideClickMenu = (): void => {
    setIsVisible(false);
    // setActivity(false);
  };

  const render: PlayerMenuProps['render'] = useMemo(
    () =>
      (attrs): ReactNode => {
        const RenderComponent: ControlMenuComponentType = props.component;

        return (
          <div {...attrs} className="player-menu-control">
            <RenderComponent handleClose={handleOutsideClickMenu} />
          </div>
        );
      },
    [props.component],
  );

  return (
    <PopoverMenu
      {...props.tooltipProps}
      visible={isVisible}
      placement="top"
      render={render}
      onClickOutside={handleOutsideClickMenu}
    >
      <PlayerControl tooltip={props.tooltip} onClick={handleControlClick} tooltipProps={{hideOnClick: true}}>
        {props.children}
      </PlayerControl>
    </PopoverMenu>
  );
};
