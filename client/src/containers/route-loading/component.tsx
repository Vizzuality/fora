import React from 'react';

import cx from 'classnames';

import { useNProgress } from '@tanem/react-nprogress';
import { AnimatePresence, motion } from 'framer-motion';

export interface RouteLoadingProps {
  loading?: boolean;
}

export const RouteLoading: React.FC<RouteLoadingProps> = ({ loading }: RouteLoadingProps) => {
  const { isFinished, progress } = useNProgress({
    isAnimating: loading,
  });

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cx({
            'fixed z-60 w-full h-full pointer-events-none': true,
          })}
        >
          <div
            className={cx({
              'absolute top-0 left-0 h-1 transition-transform bg-gradient-to-r from-blue-0 to-blue-60 w-full':
                true,
            })}
            style={{
              transform: `translateX(${-100 + progress * 100}%)`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteLoading;
