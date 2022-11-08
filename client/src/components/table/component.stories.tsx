import React, { useMemo, useState } from 'react';

import { Story } from '@storybook/react/types-6-0';
import { SortingState } from '@tanstack/react-table';

import Table from './component';
import { TableProps } from './types';

const S = {
  title: 'Components/Table',
  component: Table,
  argTypes: {},
};

export default S;

type AggregatedArea = {
  value: string;
  area: string;
  funded: number;
};

const DATA = [
  {
    value: 'equity-and-justice',
    area: 'Equity and Justice',
    funded: 60000,
  },
  {
    value: 'food-sovereignty',
    area: 'Food Sovereignty',
    funded: 12000,
  },
  {
    value: 'rural-economic-health ',
    area: 'Rural Economic Health ',
    funded: 54070,
  },
  {
    value: 'technical-assistance-and-business-planning',
    area: 'Technical Assistance and Business Planning',
    funded: 10300,
  },
  {
    value: 'grazing',
    area: 'Grazing',
    funded: 46000,
  },
  {
    value: 'soil-health',
    area: 'Soil Health',
    funded: 17000,
  },
];

const Template: Story<TableProps<AggregatedArea>> = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      {
        header: 'Area of Focus',
        accessorKey: 'area',
      },
      {
        header: 'Funded with($)',
        accessorKey: 'funded',
      },
    ],
    []
  );
  return (
    <Table
      data={DATA}
      columns={columns}
      state={{
        sorting,
      }}
      onSortingChange={setSorting}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
