import React, { ReactNode } from 'react';

import cx from 'classnames';

export interface WrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: WrapperProps) => {
  return (
    <div className="justify-center items-center flex grow px-5">
      <div className="bg-white px-40 py-20">{children}</div>
    </div>
  );
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div
      className={cx({
        'max-w-7xl mx-auto px-5 lg:px-10': true,
      })}
    >
      {children}
    </div>
  );
};

export default Wrapper;
