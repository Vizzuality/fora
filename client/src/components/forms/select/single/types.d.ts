export interface SingleSelectProps extends SelectStatusProps, SelectDataProps, SelectThemeProps {
  id: string | number;
  disabled?: boolean;
  value: string;
  options?: SelectOptionProps[];
  placeholder?: string;
  selected?: string;
  size: 'base' | 's';
  theme: 'dark' | 'light';
  onSelect?: (selection: string) => void;
}
