import { getCoreRowModel, SortingState } from '@tanstack/react-table';

import Table from '@/components/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Investment } from '@/types/api/investment';

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
    <ScrollArea className="h-full">
      <div className="table h-full w-full table-fixed">
        <Table
          columns={columns}
          data={data}
          classNames={{
            table: 'h-full w-full',
            thead: 'border-b border-grey-40 sticky top-0 bg-transparent',
            td: 'py-6',
          }}
          state={{
            sorting,
          }}
          getCoreRowModel={getCoreRowModel()}
          onSortingChange={onSorting}
          manualSorting
        />
      </div>
    </ScrollArea>
  );
}
