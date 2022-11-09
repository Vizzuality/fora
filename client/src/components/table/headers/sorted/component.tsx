import { ReactNode } from 'react';

import cx from 'classnames';

import { HeaderContext } from '@tanstack/react-table';

export interface HeaderSortedProps<T> extends HeaderContext<T, unknown> {
  children: ReactNode;
}

const HeaderSorted = <T extends unknown>({ children, column }: HeaderSortedProps<T>) => {
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer hover:underline"
      onClick={column.getToggleSortingHandler()}
    >
      <span>{children}</span>

      <div className="flex flex-col space-y-0.5 items-center">
        <span
          className={cx({
            'border-t-0 border-b-4 border-solid border-b-black border-x-transparent border-x-4':
              true,
            'opacity-50': !column.getIsSorted(),
            'opacity-100': column.getIsSorted() === 'asc',
            'opacity-0 hidden': column.getIsSorted() === 'desc',
          })}
        />
        <span
          className={cx({
            'border-t-4 border-b-0 border-solid border-t-black border-x-transparent border-x-4':
              true,
            'opacity-50': !column.getIsSorted(),
            'opacity-100': column.getIsSorted() === 'desc',
            'opacity-0 hidden': column.getIsSorted() === 'asc',
          })}
        />
      </div>
    </div>
  );
};

export default HeaderSorted;
