import { UseQueryResult } from '@tanstack/react-query';

import { ReportPages, ReportYears } from './dashboards';

export type WidgetTypes = 'diagram' | 'table' | 'total';
export type WidgetData = {
  headers: {
    label: string;
    value: string;
  }[];
  values: {
    value: any;
  }[];
};

export interface Widget {
  id: string;
  slug: string;
  title: string;
  description: string;
  config?: Record<string, any>;
  report_pages: ReportPages;
  report_year: ReportYears;
  widget_type: WidgetTypes;
  data?: WidgetData;
  query?: UseQueryResult<Widget, unknown>;
}
