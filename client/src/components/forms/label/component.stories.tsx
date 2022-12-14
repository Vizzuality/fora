import { Story } from '@storybook/react/types-6-0';

import Label from './component';
import type { LabelProps } from './types';

const StoryLabel = {
  title: 'Components/Forms/Label',
  component: Label,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
  },
};

export default StoryLabel;

const Template: Story<LabelProps> = ({ ...args }) => <Label {...args}>This is a test</Label>;

export const Default = Template.bind({});
Default.args = {
  id: 'scenario',
  theme: 'dark',
  className: 'uppercase',
};
