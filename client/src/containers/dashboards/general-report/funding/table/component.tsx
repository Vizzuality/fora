import React, { useMemo, useState } from 'react';

import { useAppSelector } from 'store/hooks';

import { ColumnDef, SortingState } from '@tanstack/react-table';

import { useWidgets } from 'hooks/widgets';

import Widget from 'containers/widget';
import Wrapper from 'containers/wrapper';

import { HeaderSorted } from 'components/table/headers';

const SLUGS = ['funded_areas', 'funded_subgeographics'] as const;

type AggregatedArea = {
  value: string;
  area: string;
  funded: number;
};

const ReportFundingTable = () => {
  const [
    selectedWidget,
    // setSelectedWidget
  ] = useState(SLUGS[0]);
  const { filters } = useAppSelector((state) => state['/dashboards/general-report']);

  const { data: widgetsData } = useWidgets({
    filters,
  });

  const WIDGET = useMemo(() => {
    return widgetsData.find((widget) => widget.slug === selectedWidget);
  }, [selectedWidget, widgetsData]);

  const columns = useMemo<ColumnDef<AggregatedArea>[]>(
    () => [
      {
        header: (ctx) => <HeaderSorted {...ctx}>Area</HeaderSorted>,
        accessorKey: 'area',
        sortingFn: 'alphanumeric',
      },
      {
        header: (ctx) => <HeaderSorted {...ctx}>Funded with ($)</HeaderSorted>,
        accessorKey: 'funded',
        sortingFn: 'alphanumeric',
        cell: ({ cell }) => {
          return <span>{cell.getValue().toLocaleString()}</span>;
        },
      },
    ],
    []
  );
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'area',
      desc: false,
    },
  ]);

  return (
    <div className="pt-5 pb-16">
      <Wrapper>
        <div className="space-y-10">
          <h3 className="max-w-2xl text-2xl font-display">Amount funded towards Area of Focus</h3>

          <Widget
            {...WIDGET}
            config={{
              columns,
              classNames: {
                table: 'border-collapse',
                tbody: 'border-t border-b border-grey-40',
                tr: 'odd:bg-white',
                th: 'py-5 px-10',
                td: 'py-5 px-10',
              },
              // STATE
              state: {
                sorting,
              },
              // SORTING
              enableSortingRemoval: false,
              onSortingChange: setSorting,
            }}
            params={{ filters }}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default ReportFundingTable;
