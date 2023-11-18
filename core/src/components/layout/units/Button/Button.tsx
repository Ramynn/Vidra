import clsx from 'clsx';
import {FunctionComponent, HTMLAttributes} from 'react';

export const Button: FunctionComponent<HTMLAttributes<HTMLButtonElement>> = (props) => {
  const {children, className, ...buttonProps} = props;
  const buttonClassName = clsx('player-button', className);

  return (
    <button className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
};
