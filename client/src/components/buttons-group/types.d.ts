export type ButtonsGroupItemProps = {
  /** Button id */
  value: string;
  /** Button name / text to be displayed */
  label: string;
};

export type ButtonsGroupProps = {
  /* Which button should be shown as active using the id */
  selected?: string;
  /* Array of button items to be shown. */
  items: ButtonsGroupItemProps[];
  /* Color for the active state */
  theme: 'green' | 'grey';
  /* Retun the id active */
  onChange: (id: string) => void;
};
