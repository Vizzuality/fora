import cx from 'classnames';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { TableProps } from './types';

const Table: React.FC<TableProps> = ({ className, headers }) => {
  return (
    <table
      className={cx({
        'w-full': true,
        [className]: !!className,
      })}
    >
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={`header-${header.id}`}>{header.label}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default Table;
