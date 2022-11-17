import { createElement, useMemo } from 'react';

import cx from 'classnames';

import { Widget } from 'types/widget';

import WidgetToolbar from 'containers/widget/toolbar';

import { HorizontalBarChart, PieChart } from './types';

const CHART_TYPES = {
  pie: PieChart,
  'horizontal-bar': HorizontalBarChart,
};

const WidgetDiagram = (widget: Widget) => {
  const { title, config } = widget;
  const { type, className } = config;

  const CHART = useMemo(() => {
    return createElement(CHART_TYPES[type], {
      ...widget,
    });
  }, [widget, type]);

  return (
    <div
      className={cx({
        'py-8 px-6 space-y-5 h-full': true,
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

      {CHART}
    </div>
  );
};

export default WidgetDiagram;
