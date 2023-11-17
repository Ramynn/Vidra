import type {FunctionComponent} from 'react';
import {memo} from 'react';
import {Animate, ExternalAnimateProps} from './Animate';

export const SideFadeIn: FunctionComponent<ExternalAnimateProps & {y?: number; x?: number}> = memo((props) => {
  const {children, x = 10, y = 0, ...animationProps} = props;

  return (
    <Animate
      initial={{x, y, opacity: 0}}
      animate={{y: 0, x: 0, opacity: 1}}
      exit={{y: 0, x: 0, opacity: 0}}
      {...animationProps}
    >
      {children}
    </Animate>
  );
});
