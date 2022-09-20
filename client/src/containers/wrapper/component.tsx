import React, { ReactNode } from 'react';

import cx from 'classnames';

export interface WrapperProps {
  children: ReactNode;
}

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
