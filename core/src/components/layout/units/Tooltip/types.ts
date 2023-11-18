import {PopoverProps} from '../Popover/types';

export interface TooltipProps extends Omit<PopoverProps, 'childrenClassname' | 'trigger'> {}
