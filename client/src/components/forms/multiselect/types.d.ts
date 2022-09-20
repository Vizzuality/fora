import { OptionProps } from './option/types';

export interface MultiSelectContextProps {
  setOpen: (open: boolean) => void;
  onChange: (value: (string | number)[]) => void;
  values: (string | number)[];
  setValues: (values: (string | number)[]) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.MutableRefObject<Array<HTMLLIElement | null>>;
  listItems: OptionProps[];
  dataRef: ContextData;
  getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => any;
}

export interface MultiSelectProps {
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  placeholder: string | React.ReactNode;
  className?: string;
  value?: (string | number)[];
  disabled?: boolean;
  clearable?: boolean;
  allable?: boolean;
  children: React.ReactNode;
  render: (selected: OptionProps[]) => React.ReactNode;
  onChange: (value: (string | number)[]) => void;
}
