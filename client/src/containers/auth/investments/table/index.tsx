import { getCoreRowModel, SortingState } from '@tanstack/react-table';

import Table from '@/components/table';
import { Investment } from '@/types/investment';

import { columns } from './columns';

export default function InvestmentsTable({
  data,
  sorting,
  onSorting,
}: {
  data: Investment[];
  sorting: SortingState;
  onSorting: (sorting: SortingState) => void;
}) {
  return (
    <Table
      columns={columns}
      data={data}
      classNames={{
        thead: 'border-b border-grey-40',
        td: 'py-6',
      }}
      state={{
        sorting,
      }}
      getCoreRowModel={getCoreRowModel()}
      onSortingChange={onSorting}
      manualSorting
    />
  );
}
