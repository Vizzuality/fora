import { Field as FieldRFF, FormRenderProps, useForm } from 'react-final-form';

import { Button } from '@/components/button/component';
import { Input, Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import FormLegend from '@/components/forms/legend';
import CapitalTypeSelector from '@/containers/auth/investments/form/capital-type';
import {
  INITIAL_YEAR_FUNDED,
  YEARS_INVESTMENT_RANGE,
} from '@/containers/auth/investments/form/constants';
import DemographicScope from '@/containers/auth/investments/form/demographic-scope';
import DurationGranInvestmentSelector from '@/containers/auth/investments/form/duration-grant-investment';
import FocusAreasSelector from '@/containers/auth/investments/form/focus-areas';
import FundingTypeSelector from '@/containers/auth/investments/form/funding-type';
import GeographicScopeCountriesSelector from '@/containers/auth/investments/form/geographic-scope-countries';
import GeographicScopeStatesSelector from '@/containers/auth/investments/form/geographic-scope-states';
import { Privacy } from '@/containers/auth/investments/form/privacy';
import { ProjectSelector } from '@/containers/auth/investments/form/project-selector';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';
import VisibilityLabel from '@/containers/auth/projects/form/label';
import { cn } from '@/lib/utils';
import { CapitalType } from '@/types/api/capital-type';
import { FundingType } from '@/types/api/funding-type';

export const useInvestmentForm = () => useForm<InvestmentSchema>();

const investmentYearsOptions = Array.from(
  {
    length:
      YEARS_INVESTMENT_RANGE[YEARS_INVESTMENT_RANGE.length - 1] - YEARS_INVESTMENT_RANGE[0] + 1,
  },
  (_, i) => ({
    value: (YEARS_INVESTMENT_RANGE[0] + i).toString(),
    label: (YEARS_INVESTMENT_RANGE[0] + i).toString(),
  }),
);

const initialYearsOptions = Array.from(
  { length: INITIAL_YEAR_FUNDED[INITIAL_YEAR_FUNDED.length - 1] - INITIAL_YEAR_FUNDED[0] + 1 },
  (_, i) => ({
    value: (INITIAL_YEAR_FUNDED[0] + i).toString(),
    label: (INITIAL_YEAR_FUNDED[0] + i).toString(),
  }),
);
export default function InvestmentForm({
  handleSubmit,
}: {
  handleSubmit: FormRenderProps['handleSubmit'];
}) {
  const { getState, submit } = useInvestmentForm();
  const {
    values: {
      capital_type: capitalTypeFormValue,
      funding_type: fundingTypeFormValue,
      grant_duration: grantDurationFormValue,
      areas: areasFormValues,
    },
    invalid,
  } = getState();

  return (
    <div className="flex flex-col gap-8">
      <header className="grid grid-cols-12 items-center justify-between">
        <div className="col-span-9">
          <ProjectSelector />
        </div>
        <div className="col-span-3 flex justify-end">
          <Button type="submit" theme="green" disabled={invalid} onClick={submit}>
            Save changes
          </Button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-10">
        <div className="grid grid-cols-12 gap-8">
          <p className="col-span-6">
            Lorem ipsum dolor sit amet consectetur et fringilla pellentesque in ut congue at
            ultrices nulla nibh dolor sit amet pellentesque consectetur.
          </p>
          <FormLegend className="col-span-12" />
          <div className="col-span-8 flex flex-col gap-2">
            <p className="flex items-start gap-1 font-semibold text-grey-20">
              <span className="text-red-0">*</span>
              All fields marked with a red asterisk are mandatory to fill
            </p>
            <p className="flex items-start gap-1 font-semibold text-grey-20">
              <span className="text-red-0">**</span>
              While funding amounts will be aggregated to ensure anonymity, limited data for
              aggregation (e.g., a single organization in a country) may risk indirectly revealing
              specific amounts. Please consider this when selecting.
            </p>
          </div>
        </div>
        <Privacy />

        <div className="space-y-2">
          <VisibilityLabel
            labelProps={{
              htmlFor: 'amount',
              'aria-required': true,
            }}
            icon="fora-members"
            required
          >
            Amount Funded
          </VisibilityLabel>
          <FieldRFF<InvestmentSchema['amount']> name="amount" type="text">
            {({ input }) => (
              <div className="space-y-2">
                <Input
                  id={input.name}
                  required
                  type="number"
                  theme="transparent"
                  className="h-[46px]"
                  defaultValue={input.value}
                  onChange={(evt) => {
                    input.onChange(Number(evt.target.value));
                  }}
                />
                <ErrorField<InvestmentSchema> name="amount" />
              </div>
            )}
          </FieldRFF>
        </div>

        <div className="grid grid-cols-12 items-start gap-4">
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'year_invested',
                }}
                required
                icon="fora-members"
              >
                Year of Funding
              </VisibilityLabel>
              <FieldRFF<InvestmentSchema['year_invested']> name="year_invested">
                {({ input }) => (
                  <div className="space-y-2">
                    <Select
                      id="year_invested"
                      placeholder="Select an option"
                      theme="gray"
                      size="base"
                      options={investmentYearsOptions}
                      value={input.value.toString()}
                      // onSelect={input.onChange}
                      onSelect={(v) => {
                        input.onChange(Number(v));
                      }}
                    />
                    <ErrorField<InvestmentSchema> name="year_invested" />
                  </div>
                )}
              </FieldRFF>
            </div>
          </div>
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'initial_funded_year',
                }}
                icon="fora-members"
              >
                Initial Year Funded
              </VisibilityLabel>
              <FieldRFF<InvestmentSchema['initial_funded_year']> name="initial_funded_year">
                {({ input }) => (
                  <div className="space-y-2">
                    <Select
                      id="initial_funded_year"
                      placeholder="Select an option"
                      theme="gray"
                      size="base"
                      options={initialYearsOptions}
                      value={input.value.toString()}
                      onSelect={(v) => {
                        input.onChange(Number(v));
                      }}
                    />
                    <ErrorField<InvestmentSchema> name="initial_funded_year" />
                  </div>
                )}
              </FieldRFF>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 items-start gap-4">
          <div
            className={cn('col-span-12', {
              'col-span-6': capitalTypeFormValue === CapitalType.Other,
            })}
          >
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'year_invested',
                }}
                required
                icon="fora-members"
              >
                Capital Type
              </VisibilityLabel>
              <CapitalTypeSelector />
            </div>
          </div>

          {capitalTypeFormValue === CapitalType.Other && (
            <div className="col-span-6">
              <div className="space-y-2">
                <VisibilityLabel
                  labelProps={{
                    htmlFor: 'capital_type_other',
                    'aria-required': true,
                  }}
                  required
                >
                  Other Capital Types
                </VisibilityLabel>
                <FieldRFF<InvestmentSchema['capital_type_other']>
                  name="capital_type_other"
                  type="text"
                >
                  {({ input }) => (
                    <div className="space-y-2">
                      <Input required {...input} className="h-[46px]" />
                      <ErrorField<InvestmentSchema> name="capital_type_other" />
                    </div>
                  )}
                </FieldRFF>
              </div>
            </div>
          )}
        </div>
        {capitalTypeFormValue === 'grants' && (
          <div className="grid grid-cols-12 items-start gap-4">
            <div
              className={cn('col-span-12', {
                'col-span-6': fundingTypeFormValue === FundingType.Other,
              })}
            >
              <div className="space-y-2">
                <VisibilityLabel
                  labelProps={{
                    htmlFor: 'funding_type',
                  }}
                  required
                  icon="fora-members"
                >
                  Funding Type
                </VisibilityLabel>
                <FundingTypeSelector />
              </div>
            </div>

            {fundingTypeFormValue === FundingType.Other && (
              <div className="col-span-6">
                <div className="space-y-2">
                  <VisibilityLabel
                    labelProps={{
                      htmlFor: 'funding_type_other',
                      'aria-required': true,
                    }}
                    required
                  >
                    Other Funding Types
                  </VisibilityLabel>
                  <FieldRFF<InvestmentSchema['funding_type_other']>
                    name="funding_type_other"
                    type="text"
                  >
                    {({ input }) => (
                      <div className="space-y-2">
                        <Input required {...input} className="h-[46px]" />
                        <ErrorField<InvestmentSchema> name="funding_type_other" />
                      </div>
                    )}
                  </FieldRFF>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-12 items-start gap-4">
          <div
            className={cn('col-span-12', {
              'col-span-6': grantDurationFormValue === 'multi_year',
            })}
          >
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'grant_duration',
                }}
                required
                icon="fora-members"
              >
                Duration of Grand/Investment
              </VisibilityLabel>
              <DurationGranInvestmentSelector />
            </div>
          </div>

          {grantDurationFormValue === 'multi_year' && (
            <div className="col-span-6">
              <div className="space-y-2">
                <VisibilityLabel
                  labelProps={{
                    htmlFor: 'number_of_grant_years',
                    'aria-required': true,
                  }}
                  required
                >
                  Number of Years
                </VisibilityLabel>
                <FieldRFF<InvestmentSchema['number_of_grant_years']>
                  name="number_of_grant_years"
                  type="text"
                >
                  {({ input }) => (
                    <div className="space-y-2">
                      <Input
                        required
                        {...input}
                        type="number"
                        className="h-[46px]"
                        onChange={(evt) => {
                          input.onChange(Number(evt.target.value));
                        }}
                      />
                      <ErrorField<InvestmentSchema> name="number_of_grant_years" />
                    </div>
                  )}
                </FieldRFF>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-12 items-start gap-4">
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'countries',
                }}
                required
              >
                Geographic Scope - Countries
              </VisibilityLabel>
              <GeographicScopeCountriesSelector />
            </div>
          </div>
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'states',
                }}
              >
                Geographic Scope - States
              </VisibilityLabel>
              <GeographicScopeStatesSelector />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 items-start gap-4">
          <div
            className={cn('col-span-12', {
              'col-span-6': areasFormValues.includes('Other'),
            })}
          >
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'areas',
                }}
                required
                icon="fora-members"
              >
                Areas of Focus for this Funding
              </VisibilityLabel>
              <FocusAreasSelector />
            </div>
          </div>

          {areasFormValues.includes('Other') && (
            <div className="col-span-6">
              <div className="space-y-2">
                <VisibilityLabel
                  labelProps={{
                    htmlFor: 'areas_other',
                    'aria-required': true,
                  }}
                  required
                >
                  Other areas
                </VisibilityLabel>
                <FieldRFF<InvestmentSchema['areas_other']> name="areas_other" type="text">
                  {({ input }) => (
                    <div className="space-y-2">
                      <Input required {...input} />
                      <ErrorField<InvestmentSchema> name="areas_other" />
                    </div>
                  )}
                </FieldRFF>
              </div>
            </div>
          )}
        </div>
        <DemographicScope />
      </form>
    </div>
  );
}
