import cx from 'classnames';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { TableProps } from './types';

const Table = <T extends unknown>({
  data,
  columns,
  classNames = {},
  ...options
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...options,
  });

  return (
    <table
      className={cx({
        'w-full': true,
        [classNames.table]: !!classNames.table,
      })}
    >
      <thead
        className={cx({
          [classNames.thead]: !!classNames.thead,
        })}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={cx({
                  'py-5 text-left text-base font-semibold': true,
                  [classNames.th]: !!classNames.th,
                })}
                style={{
                  width: header.getSize(),
                }}
              >
                <div
                  className={cn({
                    'flex items-center space-x-2': true,
                    'cursor-pointer select-none': header.column.getCanSort(),
                  })}
                  onClick={header.column.getToggleSortingHandler()}
                  title={
                    header.column.getCanSort()
                      ? header.column.getNextSortingOrder() === 'asc'
                        ? 'Sort ascending'
                        : header.column.getNextSortingOrder() === 'desc'
                          ? 'Sort descending'
                          : 'Clear sort'
                      : undefined
                  }
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: <ChevronUpIcon className="h-4 w-4 text-grey-20" />,
                    desc: <ChevronDownIcon className="h-4 w-4 text-grey-20" />,
                  }[header.column.getIsSorted() as string] ??
                    (header.column.getCanSort() && (
                      <ChevronsUpDownIcon className="h-4 w-4 text-grey-20" />
                    ))}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody
        className={cx({
          [classNames.tbody]: !!classNames.tbody,
        })}
      >
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={cx({
              [classNames.tr]: !!classNames.tr,
            })}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={cx({
                  [classNames.td]: !!classNames.td,
                })}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
