type ReportPages = 'general_report' | 'disparities_report' | 'interactive_report';
type ReportYears = 2021;

type WidgetTypes = 'diagram' | 'table' | 'total';
type WidgetData = {
  key: string;
  data: any;
};

export interface Widget {
  id: string;
  slug: string;
  title: string;
  description: string;
  report_pages: ReportPages;
  report_year: ReportYears;
  widget_type: WidgetTypes;
  widget_data?: WidgetData;
}
