export interface FilterListItemProps {
  id: string;
  label: string;
  name: string;
  selected: boolean;
  onChange: (id: string) => void;
}
