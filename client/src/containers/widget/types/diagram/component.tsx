import { createElement, useMemo } from 'react';

import cx from 'classnames';

import { Widget } from 'types/widget';

import WidgetToolbar from 'containers/widget/toolbar';

import Loading from 'components/loading';

import { HorizontalBarChart, PieChart } from './types';

const CHART_TYPES = {
  pie: PieChart,
  'horizontal-bar': HorizontalBarChart,
};

const WidgetDiagram = (widget: Widget) => {
  const { title, config, query } = widget;
  const { type, className } = config;

  const { data, isFetched, isFetching } = query;

  const NO_DATA = useMemo(() => {
    if (!isFetched || isFetching) return false;

    const { data: d } = data;

    const D = d.values
      .map((v) => {
        const [name, value] = v;

        return {
          id: name.id,
          label: name.value,
          ...value,
        };
      })
      .some((v) => v.value);

    return !D;
  }, [data, isFetched, isFetching]);

  const CHART = useMemo(() => {
    return createElement(CHART_TYPES[type], {
      ...widget,
    });
  }, [widget, type]);

  return (
    <div
      className={cx({
        'relative py-8 px-6 space-y-5 h-full': true,
        [className]: !!className,
      })}
    >
      <header className="flex items-start justify-between space-x-10">
        <h3 className="text-2xl font-display">{title}</h3>

        <WidgetToolbar
          {...widget}
          toolbar={{
            info: true,
            download: true,
          }}
        />
      </header>

      <Loading
        visible={isFetching && !isFetched}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/90"
        iconClassName="w-10 h-10"
      />

      {NO_DATA && (
        <div className="flex items-center justify-center flex-grow h-60">
          <p className="uppercase font-display">No data available</p>
        </div>
      )}

      {!NO_DATA && CHART}
    </div>
  );
};

export default WidgetDiagram;
