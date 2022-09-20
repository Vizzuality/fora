export type TabsType = {
  /** Tab id */
  id: string;
  /** Tab name / text to be displayed */
  name: string;
};

export type TabsProps = {
  /* Which tab should be shown as active using the id */
  selected?: string;
  /* Array of tab items to be shown. */
  items: TabsType[];
  /* Color for the active state */
  theme: 'green' | 'grey';
  /* Retun the id active */
  onChange: (id: string) => void;
};
