import { createElement, useMemo } from 'react';

import cx from 'classnames';

import { Widget } from 'types/widget';

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
        [className]: !!className,
      })}
    >
      <header>
        <h3>{title}</h3>
      </header>

      {CHART}
    </div>
  );
};

export default WidgetDiagram;
