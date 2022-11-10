import { useMemo } from 'react';

import { Widget } from 'types/widget';

import Table from 'components/table';

const WidgetTable = (widget: Widget) => {
  const { query, config } = widget;
  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) return [];

    const { data: d } = data;

    return d.values.map((value) => {
      return value.reduce((acc, v, i) => {
        return {
          ...acc,
          [d.headers[i].value]: v.value,
        };
      }, {});
    });
  }, [data]);

  return (
    <div className="overflow-auto h-96">
      <Table {...config} data={DATA} />
    </div>
  );
};

export default WidgetTable;
