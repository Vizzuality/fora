import React, { useMemo, useState } from 'react';

import { formatDollar } from 'lib/formats';

import { Geographic } from 'store/action-map';
import { useAppSelector } from 'store/hooks';

import { ColumnDef, SortingFnOption, SortingState } from '@tanstack/react-table';

import { useGeographics } from 'hooks/geographics';
import { useWidgets } from 'hooks/widgets';

import Widget from 'containers/widget';
import WidgetToolbar from 'containers/widget/toolbar';
import Wrapper from 'containers/wrapper';

import { Select } from 'components/forms';
import { HeaderSorted } from 'components/table/headers';

const SLUGS = ['funded_areas', 'funded_subgeographics'];
const OPTIONS = [
  {
    label: 'Area of focus',
    value: 'funded_areas',
    defaultSorting: {
      id: 'funded_with',
      desc: true,
    },
  },
  {
    label: 'Geographic scope',
    value: 'funded_subgeographics',
    defaultSorting: {
      id: 'funded_with',
      desc: true,
    },
  },
];

type AggregatedArea = {
  area_of_focus?: string;
  geographic?: string;
  funded_width: number;
};

const ReportFundingTable = () => {
  const [selectedWidget, setSelectedWidget] = useState(SLUGS[0]);
  const [sorting, setSorting] = useState<SortingState>();
  const [geographic, setGeographic] = useState<Geographic>('regions');

  const { data: geographicData } = useGeographics();

  const { filters } = useAppSelector((state) => state['/dashboards/general-report']);

  const { data: widgetsData } = useWidgets({
    filters,
  });

  const WIDGET = useMemo(() => {
    const w = widgetsData.find((widget) => widget.slug === selectedWidget);

    return {
      ...w,
      params: {
        filters: {
          ...filters,
          geographic,
        },
      },
    };
  }, [selectedWidget, widgetsData, filters, geographic]);

  const columns = useMemo<ColumnDef<AggregatedArea>[]>(
    () => [
      ...(selectedWidget === 'funded_areas'
        ? [
            {
              header: (ctx) => <HeaderSorted {...ctx}>Area</HeaderSorted>,
              accessorKey: 'area_of_focus',
              sortingFn: 'alphanumeric' as SortingFnOption<AggregatedArea>,
              minSize: 500,
            },
          ]
        : []),
      ...(selectedWidget === 'funded_subgeographics'
        ? [
            {
              header: () => (
                <Select
                  id="geographic-table-header"
                  theme="none"
                  size="none"
                  options={geographicData.map((geo) => ({
                    label: geo.name,
                    value: geo.id,
                  }))}
                  value={geographic}
                  onSelect={(v) => setGeographic(v as Geographic)}
                />
              ),
              accessorKey: 'geographic',
              minSize: 500,
            },
          ]
        : []),

      {
        header: (ctx) => <HeaderSorted {...ctx}>Funded with ($)</HeaderSorted>,
        accessorKey: 'funded_with',
        sortingFn: 'alphanumeric',
        cell: ({ cell }) => {
          return (
            <span>
              {formatDollar(cell.getValue(), {
                maximumFractionDigits: 2,
              })}
            </span>
          );
        },
      },
    ],
    [geographic, geographicData, selectedWidget]
  );

  useMemo(() => {
    const option = OPTIONS.find((o) => o.value === selectedWidget);

    setSorting([
      {
        id: option?.defaultSorting.id,
        desc: option?.defaultSorting.desc,
      },
    ]);
  }, [selectedWidget]);

  return (
    <div className="pt-5 pb-16">
      <Wrapper>
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="max-w-2xl text-2xl font-display">
              Amount funded towards{' '}
              <Select
                id="funded-select"
                value={selectedWidget}
                theme="none"
                size="none"
                options={OPTIONS}
                onSelect={(value) => {
                  setSelectedWidget(value);
                }}
              />
            </h3>

            <WidgetToolbar
              {...WIDGET}
              toolbar={{
                download: true,
              }}
            />
          </div>

          <Widget
            {...WIDGET}
            config={{
              columns,
              classNames: {
                table: 'border-collapse',
                thead: 'sticky top-0 bg-grey-60',
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
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default ReportFundingTable;
