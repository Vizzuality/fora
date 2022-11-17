export interface MultiSelectProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  className?: string;
  options?: SelectOptionProps[];
  placeholder?: string;
  disabled?: boolean;
  size: 'base' | 's';
  theme: 'dark' | 'light';
  values?: string[];
  loading?: boolean;
  batchSelectionActive?: boolean;
  batchSelectionLabel?: string;
  clearSelectionActive?: boolean;
  clearSelectionLabel?: string;
  onSelect?: (selection: string[]) => void;
}
