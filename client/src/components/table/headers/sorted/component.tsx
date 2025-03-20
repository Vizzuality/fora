import { ReactNode } from 'react';

import cx from 'classnames';

import { HeaderContext } from '@tanstack/react-table';

export interface HeaderSortedProps<T> extends HeaderContext<T, unknown> {
  children: ReactNode;
}

const HeaderSorted = <T extends unknown>({ children, column }: HeaderSortedProps<T>) => {
  return (
    <div
      className="flex cursor-pointer items-center space-x-2 hover:underline"
      onClick={column.getToggleSortingHandler()}
    >
      <span>{children}</span>

      <div className="flex flex-col items-center space-y-0.5">
        <span
          className={cx({
            'border-x-4 border-t-0 border-b-4 border-solid border-x-transparent border-b-black':
              true,
            'opacity-50': !column.getIsSorted(),
            'opacity-100': column.getIsSorted() === 'asc',
            'hidden opacity-0': column.getIsSorted() === 'desc',
          })}
        />
        <span
          className={cx({
            'border-x-4 border-t-4 border-b-0 border-solid border-x-transparent border-t-black':
              true,
            'opacity-50': !column.getIsSorted(),
            'opacity-100': column.getIsSorted() === 'desc',
            'hidden opacity-0': column.getIsSorted() === 'asc',
          })}
        />
      </div>
    </div>
  );
};

export default HeaderSorted;
