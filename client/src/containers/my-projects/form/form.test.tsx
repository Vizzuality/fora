import { render, fireEvent } from '@testing-library/react';
import { expect } from 'vitest';

import { AppWrapper } from 'tests/utils';

import FormWrapper from './wrapper';

import Form from './index';

const FormContext = () => (
  <AppWrapper>
    <FormWrapper
      onSubmit={async () => {}}
      render={({ handleSubmit }) => {
        return <Form handleSubmit={handleSubmit} />;
      }}
    />
  </AppWrapper>
);

const mocks = vi.hoisted(() => {
  return {
    mockedUseDemographics: vi.fn().mockReturnValue({
      data: [
        {
          id: 'asian',
          name: 'Asian',
        },
        {
          id: 'indigenous_tribal_nations',
          name: 'Indigenous/Tribal Nations',
        },
        {
          id: 'lgbtq',
          name: 'LGBTQ',
        },
        {
          id: 'no_specific_focus',
          name: 'No Specific Focus',
        },
        {
          id: 'other',
          name: 'Other',
        },
      ],
      isFetching: false,
      isFetched: true,
    }),
  };
});

vi.mock('hooks/demographics', () => {
  return {
    useDemographics: mocks.mockedUseDemographics,
  };
});

const mockedUseSearchParams = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  usePathname: () => '/test-pathname',
  useSearchParams: mockedUseSearchParams.mockReturnValue(new URLSearchParams()),
}));

describe('project form', () => {
  it('choosing "yes" in the information collection, a selector to select the demographics appears', () => {
    const { container } = render(<FormContext />);
    expect(container.querySelectorAll('input[name="internal-demographics"]')[0]).toHaveAttribute(
      'checked'
    );
    expect(container.querySelector('#leadership_demographics')).toBeInTheDocument();
  });

  it('choosing "no" in the information collection, a selector to select the demographics won\'t appear', () => {
    const { container } = render(<FormContext />);
    const optionNo = container.querySelectorAll('input[name="internal-demographics"]')[1];
    fireEvent.click(optionNo);
    expect(optionNo).toBeChecked();
    expect(container.querySelector('#leadership_demographics')).not.toBeInTheDocument();
  });

  it('choosing "Yes" in the information collection, and selecting "Others" in the demographic selector will make appear a new input to specify', async () => {
    const { container } = render(<FormContext />);

    expect(container.querySelectorAll('input[name="internal-demographics"]')[0]).toHaveAttribute(
      'checked'
    );

    const demographicSelector = container.querySelector('#leadership_demographics');
    expect(demographicSelector).toBeInTheDocument();
    fireEvent.click(demographicSelector.querySelector('button'));

    const OptionOther = demographicSelector.querySelector('input[name="other"]');
    fireEvent.click(OptionOther);

    expect(OptionOther).toBeChecked();
    expect(container.querySelector('input[name="demographics_other"]')).toBeInTheDocument();
  });
});
