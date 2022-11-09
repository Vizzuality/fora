import { Widget } from 'types/widget';

import Table from 'components/table';

const FAKE_DATA = [
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

const WidgetTable = (widget: Widget) => {
  const { config } = widget;

  return <Table {...config} data={FAKE_DATA} />;
};

export default WidgetTable;
