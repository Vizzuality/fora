import { createElement, useMemo } from 'react';

import { Widget } from 'types/widget';

import { useWidget } from 'hooks/widgets';

import { WidgetDiagram, WidgetTable, WidgetTotals } from 'containers/widget/types';

const WIDGETS_TYPES = {
  table: WidgetTable,
  totals: WidgetTotals,
  diagram: WidgetDiagram,
};

const WidgetWrapper = (widget: Widget) => {
  const { slug, widget_type: widgetType } = widget;
  const query = useWidget(slug);

  const WIDGET = useMemo(() => {
    return createElement(WIDGETS_TYPES[widgetType], {
      ...widget,
      ...query,
    });
  }, [widget, query, widgetType]);

  return WIDGET;
};

export default WidgetWrapper;
