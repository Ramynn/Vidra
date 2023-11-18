import type {FunctionComponent} from 'react';
import {useMemo} from 'react';
import {ControlProps, KeyPressListener} from './types';
import {useKeyPress} from '../../../../hooks';
import {Tooltip} from '../Tooltip';
import {Button} from '../Button';

export const PlayerControl: FunctionComponent<ControlProps> = (props) => {
  // TODO: Fix this after implementing usePlayer hook
  // const player = usePlayer()!;
  // const keyboardCodes: KeyPressListener | null =
  //   player.allowKeyListeners && props.keyPressListener ? props.keyPressListener : null;

  const keyboardCodes: KeyPressListener | null = props.keyPressListener ?? null;

  const tooltip = useMemo<string | undefined>(() => {
    if (!props.tooltip) {
      return;
    }

    if (!keyboardCodes?.label) {
      return props.tooltip;
    }

    return `${props.tooltip} (${keyboardCodes.label})`;
  }, [keyboardCodes?.label, props.tooltip]);

  useKeyPress(keyboardCodes?.key ?? null, props.onClick);

  return (
    <Tooltip content={tooltip} placement="top" {...props.tooltipProps}>
      <Button onClick={props.onClick}>{props.children}</Button>
    </Tooltip>
  );
};
