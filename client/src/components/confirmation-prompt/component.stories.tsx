import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';

import Button from 'components/button';

import ConfirmationPrompt, { ConfirmationPromptProps } from './index';

const StoryConfirmationPrompt = {
  title: 'Components/ConfirmationPrompt',
  component: ConfirmationPrompt,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    open: {
      control: {
        disable: true,
      },
    },
    onDismiss: {
      control: {
        disable: true,
      },
    },
    onAccept: {
      control: {
        disable: true,
      },
    },
    onRefuse: {
      control: {
        disable: true,
      },
    },
  },
};

export default StoryConfirmationPrompt;

const Template: Story<ConfirmationPromptProps> = ({ ...args }: ConfirmationPromptProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button theme="black" size="base" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <ConfirmationPrompt
        {...args}
        open={open}
        onAccept={() => {
          console.info('Accepted deletion');
          setOpen(false);
        }}
        onRefuse={() => {
          console.info('Refused deletion');
          setOpen(false);
        }}
        onDismiss={() => setOpen(false)}
      />
    </>
  );
};

export const Default: Story<ConfirmationPromptProps> = Template.bind({});
Default.args = {
  title: 'Are you sure you want to delete this item?',
};

export const WithDescription: Story<ConfirmationPromptProps> = Template.bind({});
WithDescription.storyName = 'With description';
WithDescription.args = {
  title: 'Are you sure you want to delete this item?',
  description: 'The action cannot be reverted.',
};
