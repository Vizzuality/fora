import { fireEvent, render } from '@testing-library/react';
import { expect } from 'vitest';

import { PrivacyEnum } from '@/containers/auth/investments/form/types';
import { AppWrapper } from 'tests/utils';

import FormWrapper from './wrapper';

import Form from './index';

const FormContext = () => (
  <AppWrapper>
    <FormWrapper
      onSubmit={async () => {}}
      initialValues={{
        privacy: PrivacyEnum.All,
        countries: [],
        states: [],
        areas: [],
        demographics: [],
        internal_demographics_collection: 'yes',
      }}
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
    mockedUseProjects: vi.fn().mockReturnValue({
      data: [
        {
          value: '1',
          label: 'Project 1',
        },
        {
          value: '2',
          label: 'Project 2',
        },
      ],
    }),
  };
});

vi.mock('hooks/demographics', () => {
  return {
    useDemographics: mocks.mockedUseDemographics,
  };
});

vi.mock('hooks/projects', () => {
  return {
    useProjects: mocks.mockedUseProjects,
  };
});

const mockedUseSearchParams = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  usePathname: () => '/test-pathname',
  useSearchParams: mockedUseSearchParams.mockReturnValue(new URLSearchParams()),
}));

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  scrollIntoView: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

window.HTMLElement.prototype.scrollIntoView = function () {};

describe('investment form', () => {
  // @todo remove skip
  it.skip('creates an investment', () => {
    const { container } = render(<FormContext />);

    const amountInput = container.querySelector('input[name="amount"]');
    // const fundingYearButton = container.querySelector();
    // const initialYearFundedInput = container.querySelector(
    //   'input[name="listbox-initial_funded_year"]',
    // );

    fireEvent.change(amountInput, { target: { value: 1000 } });
    expect(amountInput).toHaveValue('1000');
    // act(() => {
    //   fireEvent.change(fundingYearButton, { target: { value: '2022' } });
    //   expect(fundingYearButton).toHaveValue('2022');
    // });
    //
    // act(() => {
    //   fireEvent.change(initialYearFundedInput, { target: { value: '1984' } });
    //   expect(initialYearFundedInput).toHaveValue('1984');
    // });
  });
});
