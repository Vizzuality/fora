import cx from 'classnames';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

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
                  'py-5 text-base font-semibold text-left': true,
                  [classNames.th]: !!classNames.th,
                })}
                style={{
                  width: header.getSize(),
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
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
