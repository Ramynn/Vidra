import {PopoverProps} from '../Popover/types';

export interface PlayerMenuProps
  extends Omit<PopoverProps, 'childrenClassname' | 'trigger' | 'theme' | 'arrow' | 'interactive'> {}
