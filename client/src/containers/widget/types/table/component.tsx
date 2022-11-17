import { useMemo } from 'react';

import { Widget } from 'types/widget';

import Loading from 'components/loading';
import Table from 'components/table';

const WidgetTable = (widget: Widget) => {
  const { query, config } = widget;
  const { data, isFetching, isFetched } = query;

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
    <div className="relative">
      <Loading
        visible={isFetching && !isFetched}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/90"
        iconClassName="w-10 h-10"
      />
      <div className="relative overflow-auto h-96">
        <Table {...config} data={DATA} />
      </div>
    </div>
  );
};

export default WidgetTable;
