export type ReportPages = 'general_report' | 'disparities_report' | 'interactive_report';
export type ReportYears = 2021 | 2022 | 2023;

export type ReportYear = {
  id: string;
  name: ReportYears;
  type: 'report_year';
};
