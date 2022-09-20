export interface FilterTriggerProps {
  /**
   * Span title of the filter
   */
  title: string;
  /**
   * Info icon Popover content
   */
  info?: React.ReactNode;
  /**
   * Selected item to filter with
   */
  Selected: React.ReactElement;
  /**
   * Modal content
   */
  Modal: React.ReactElement;
}
