import { TableOptions } from '@tanstack/react-table';

export interface TableProps<T> extends Partial<TableOptions<T>> {
  classNames?: {
    table?: string;
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
  };
}

export type TData = {};
