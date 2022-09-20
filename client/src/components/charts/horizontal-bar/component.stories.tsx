import { Story } from '@storybook/react/types-6-0';

import HorizontalBarChart from './component';
import { HorizontalBarChartProps } from './types';

const StoryHorizontalBarChart = {
  title: 'Components/Charts/HorizontalBar',
  component: HorizontalBarChart,
  argTypes: {},
};

export default StoryHorizontalBarChart;

const Template: Story<HorizontalBarChartProps> = ({ ...args }: HorizontalBarChartProps) => (
  <HorizontalBarChart {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      id: 'a',
      label: 'Amazing',
      value: 50,
    },
    {
      id: 'b',
      label: 'Beautiful',
      value: 40,
    },
    {
      id: 'c',
      label: 'Cool',
      value: 30,
    },
    {
      id: 'd',
      label: 'Delightful',
      value: 20,
    },
    {
      id: 'e',
      label: 'Elegant',
      value: 10,
    },
  ],
  onPathMouseClick: (d) => console.info(d),
  onPathMouseEnter: (d) => console.info(d),
  onPathMouseLeave: (d) => console.info(d),
};
