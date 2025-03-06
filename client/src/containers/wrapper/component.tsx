import React, { ReactNode } from 'react';

import { cn } from 'lib/utils';

export interface WrapperProps {
  children: ReactNode;
  className?: HTMLDivElement['className'];
}

export const AuthWrapper = ({ children }: WrapperProps) => {
  return (
    <div className="justify-center items-center flex grow px-5">
      <div className="bg-white px-40 py-20">{children}</div>
    </div>
  );
};

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={cn({
        'max-w-7xl mx-auto px-5 lg:px-10': true,
        [className]: !!className,
      })}
    >
      {children}
    </div>
  );
};

export default Wrapper;
