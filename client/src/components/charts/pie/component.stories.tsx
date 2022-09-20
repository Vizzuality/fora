import { Story } from '@storybook/react/types-6-0';

import PieChart from './component';
import { PieChartProps } from './types';

const StoryPieChart = {
  title: 'Components/Charts/Pie',
  component: PieChart,
  argTypes: {},
};

export default StoryPieChart;

const Template: Story<PieChartProps> = ({ ...args }: PieChartProps) => <PieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 250,
  height: 250,
  data: [
    {
      id: 'a',
      label: 'Amazing',
      value: 10,
    },
    {
      id: 'b',
      label: 'Beautiful',
      value: 20,
    },
    {
      id: 'c',
      label: 'Cool',
      value: 30,
    },
    {
      id: 'd',
      label: 'Delightful',
      value: 40,
    },
    {
      id: 'e',
      label: 'Elegant',
      value: 50,
    },
  ],
  onPathMouseClick: (d) => console.info(d),
  onPathMouseEnter: (d) => console.info(d),
  onPathMouseLeave: (d) => console.info(d),
};
