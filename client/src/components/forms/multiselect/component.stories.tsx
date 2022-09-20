/* eslint-disable @next/next/no-img-element */
import { Story } from '@storybook/react/types-6-0';

import MultiSelect from './component';
import Option from './option';
import type { MultiSelectProps } from './types';

const StoryMultiSelect = {
  title: 'Components/Forms/MultiSelect',
  component: MultiSelect,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export default StoryMultiSelect;

const ITEMS = [
  {
    label: 'Toy Story',
    value: 'toy-story',
  },
  {
    label: 'A Bugs Life',
    value: 'a-bugs-life',
    disabled: true,
  },
  {
    label: 'Toy Story 2',
    value: 'toy-story-2',
  },
  {
    label: 'Monsters, Inc.',
    value: 'monsters,-inc',
  },
  {
    label: 'Finding Nemo',
    value: 'finding-nemo',
  },
  {
    label: 'The Incredibles',
    value: 'the-incredibles',
  },
  {
    label: 'Cars',
    value: 'cars',
  },
  {
    label: 'Ratatouille',
    value: 'ratatouille',
  },
  {
    label: 'WALL-E',
    value: 'walle',
  },
  {
    label: 'Up',
    value: 'up',
  },
  {
    label: 'Cars 2',
    value: 'cars-2',
  },
  {
    label: 'Toy Story 3',
    value: 'toy-story-3',
  },
  {
    label: 'Brave',
    value: 'brave',
  },
  {
    label: 'Monsters University',
    value: 'monsters-university',
  },
  {
    label: 'Inside Out',
    value: 'inside-out',
  },
  {
    label: 'The Good Dinosaur',
    value: 'the-good-dinosaur',
  },
  {
    label: 'Finding Dory',
    value: 'finding-dory',
  },
  {
    label: 'Cars 3',
    value: 'cars-3',
  },
  {
    label: 'Coco',
    value: 'coco',
  },
  {
    label: 'Incredibles 2',
    value: 'incredibles-2',
  },
  {
    label: 'Toy Story 4',
    value: 'toy-story-4',
  },
  {
    label: 'Onward',
    value: 'onward',
  },
  {
    label: 'Soul',
    value: 'soul',
  },
  {
    label: 'Luca',
    value: 'luca',
  },
];

const Template: Story<MultiSelectProps> = (args) => (
  <MultiSelect
    {...args}
    value={['toy-story', 'toy-story-2']}
    render={(selected) => {
      if (selected.length === ITEMS.filter((i) => !i.disabled).length) {
        return 'All items selected';
      }
      if (selected.length === 1) {
        return selected[0].label;
      }
      if (selected.length > 1) {
        return `${selected.length} items selected`;
      }
      return 'Select an item';
    }}
    onChange={(e) => console.info(e)}
  >
    {ITEMS.map(({ label, value, disabled }) => (
      <Option key={value} value={value} theme={args.theme} label={label} disabled={disabled}>
        <div className="flex space-x-3">{label}</div>
      </Option>
    ))}
  </MultiSelect>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select multiple items...',
  theme: 'light',
  clearable: true,
  allable: true,
};
