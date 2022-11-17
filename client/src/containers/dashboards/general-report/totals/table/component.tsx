import React, { useMemo, useState } from 'react';

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

const SLUGS = ['total_projects_funders_areas', 'total_projects_funders_subgeographics'];
const OPTIONS = [
  {
    label: 'Area of focus',
    value: 'total_projects_funders_areas',
    defaultSorting: {
      id: 'area_of_focus',
      desc: false,
    },
  },
  {
    label: 'Geographic scope',
    value: 'total_projects_funders_subgeographics',
    defaultSorting: {
      id: 'geographic',
      desc: false,
    },
  },
];

type AggregatedArea = {
  area_of_focus?: string;
  geographic?: string;
  total_funders: number;
  total_projects: number;
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
      ...(selectedWidget === 'total_projects_funders_areas'
        ? [
            {
              header: (ctx) => <HeaderSorted {...ctx}>Area</HeaderSorted>,
              accessorKey: 'area_of_focus',
              sortingFn: 'alphanumeric' as SortingFnOption<AggregatedArea>,
              minSize: 500,
            },
          ]
        : []),
      ...(selectedWidget === 'total_projects_funders_subgeographics'
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
        header: (ctx) => <HeaderSorted {...ctx}>Total funders</HeaderSorted>,
        accessorKey: 'total_funders',
        sortingFn: 'alphanumeric',
        cell: ({ cell }) => {
          return <span>{cell.getValue().toLocaleString()}</span>;
        },
      },
      {
        header: (ctx) => <HeaderSorted {...ctx}>Total projects</HeaderSorted>,
        accessorKey: 'total_projects',
        sortingFn: 'alphanumeric',
        cell: ({ cell }) => {
          return <span>{cell.getValue().toLocaleString()}</span>;
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
            <h3 className="text-2xl font-display">
              Total number of projects and funders per{' '}
              <Select
                id="total-funders-projects-select"
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
                thead: 'sticky top-0 bg-white',
                tbody: 'border-t border-b border-grey-40',
                tr: 'odd:bg-grey-60',
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
