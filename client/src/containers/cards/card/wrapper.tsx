import { PropsWithChildren } from 'react';

import cx from 'classnames';

import { THEME } from '@/containers/cards/card/constants';

export function CardWrapper({
  theme = 'green',
  className,
  children,
}: PropsWithChildren<{ theme?: 'green' | 'grey'; className?: HTMLDivElement['className'] }>) {
  return (
    <div
      className={cx({
        'flex flex-col justify-between p-8': true,
        [THEME[theme]]: true,
        [className]: !!className,
      })}
    >
      {children}
    </div>
  );
}
