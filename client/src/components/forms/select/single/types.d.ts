export interface SingleSelectProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  className?: string;
  options?: SelectOptionProps[];
  placeholder?: string;
  disabled?: boolean;
  size: 'base' | 's' | 'none';
  theme: 'dark' | 'light' | 'none';
  value: string;
  loading?: boolean;
  clearable?: boolean;
  clearSelectionLabel?: string;
  onSelect?: (selection: string) => void;
}
