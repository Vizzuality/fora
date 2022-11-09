import { createElement, useMemo } from 'react';

import { ParamsProps } from 'lib/adapters/types';

import { Widget } from 'types/widget';

import { useWidget } from 'hooks/widgets';

import { WidgetDiagram, WidgetTable, WidgetTotal } from 'containers/widget/types';

const WIDGETS_TYPES = {
  table: WidgetTable,
  total: WidgetTotal,
  diagram: WidgetDiagram,
};

export interface WidgetWrapperProps extends Widget {
  params: ParamsProps;
}

const WidgetWrapper = ({ params, ...widget }: WidgetWrapperProps) => {
  const { slug, widget_type: widgetType } = widget;
  const query = useWidget(slug, params);

  const WIDGET = useMemo(() => {
    if (WIDGETS_TYPES[widgetType]) {
      return createElement(WIDGETS_TYPES[widgetType], {
        ...widget,
        query,
      });
    }

    return null;
  }, [widget, query, widgetType]);

  return WIDGET;
};

export default WidgetWrapper;
