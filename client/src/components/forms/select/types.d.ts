import { OptionProps } from './option/types';

export interface SelectContextProps {
  setOpen: (open: boolean) => void;
  onChange: (value: string | number) => void;
  selectedIndex: number | number[];
  setSelectedIndex: (index: number) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.MutableRefObject<Array<HTMLLIElement | null>>;
  dataRef: ContextData;
  getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => any;
}

export interface SelectProps {
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  placeholder: string | React.ReactNode;
  className?: string;
  value?: string | number | unknown;
  disabled?: boolean;
  clearable?: boolean;
  children: React.ReactNode;
  render: (selected: OptionProps) => React.ReactNode;
  onChange: (value: string | number) => void;
}
