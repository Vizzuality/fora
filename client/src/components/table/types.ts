export interface TableProps {
  className?: string;
  // headers: TableHeaderItem[];
  body: TableRow[];
  selectedRowId?: string | number;
}

export interface TableRow {
  id: string;
  isSelected?: boolean;
}
