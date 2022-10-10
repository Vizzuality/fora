export interface FilterListProps {
  title?: string;
  name?: string;
  columns?: number;
  loading?: boolean;
  overflow?: boolean;
  /**
   * Data
   */
  data: {
    id: string;
    name: string;
    info?: string;
  }[];
  /**
   * Selected item to filter with
   */
  selected: string[] | number[] | unknown;
  /**
   * Selected item copunt
   */
  SelectedCount?: React.ReactElement;

  onSelectAll: () => void;
  onClearAll: () => void;
  onChange: (id: string) => void;
}
