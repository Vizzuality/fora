export interface OptionProps {
  index?: number;
  value: string | number;
  label: string;
  theme?: 'dark' | 'light';
  children: React.ReactNode;
  disabled?: boolean;
}
