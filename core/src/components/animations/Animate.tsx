import type {FunctionComponent, ReactNode} from 'react';
import {memo, useMemo} from 'react';
import {AnimatePresence, motion, MotionProps} from 'framer-motion';

interface AnimateProps extends MotionProps {
  when?: (undefined | null | boolean | string | number) | unknown[];
  className?: string;
  exitBeforeEnterPresence?: boolean;
  initialPresence?: boolean;
  children: ReactNode;
}

export type ExternalAnimateProps = Omit<AnimateProps, 'initial' | 'animate' | 'exit'>;

export const Animate: FunctionComponent<AnimateProps> = memo((props) => {
  const {children, when, exitBeforeEnterPresence = true, initialPresence = true, ...animationProps} = props;

  const animationKey: null | string | number = useMemo(() => {
    if (typeof when === 'boolean') {
      return when ? 1 : 0;
    }

    if (Array.isArray(when)) {
      return when.join('_');
    }

    return when ?? null;
  }, [when]);

  return (
    <AnimatePresence mode={exitBeforeEnterPresence ? 'wait' : undefined} initial={initialPresence}>
      <motion.div key={animationKey} {...animationProps}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
});
