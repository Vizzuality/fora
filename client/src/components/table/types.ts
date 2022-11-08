import { TableOptions } from '@tanstack/react-table';

export interface TableProps<T> extends Partial<TableOptions<T>> {
  className?: string;
}

export type TData = {};
