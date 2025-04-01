import { ComponentProps } from 'react';

import { Field as FieldRFF, useFormState } from 'react-final-form';

import { useDemographics } from 'hooks/demographics';

import ErrorField from '@/components/forms/error-field';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';
import VisibilityLabel from '@/containers/auth/projects/form/label';
import { Input, MultiSelect, Radio, Select } from 'components/forms';

export default function DemographicScope() {
  const {
    data: demographics,
    isFetching: demographicsFetching,
    isFetched: demographicsFetched,
  } = useDemographics();

  const {
    values: {
      demographics: demographicsFormValues,
      internal_demographics_collection: collectsInformation,
    },
  } = useFormState<InvestmentSchema>();

  const demographicsOptions: ComponentProps<typeof Select>['options'] =
    demographics?.map(({ id, name }) => ({ value: id, label: name })) || [];

  return (
    <>
      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'internal_demographics_collection',
            className: 'normal-case',
          }}
          required
        >
          Do you collect information on the demographic scope of your partner organizations?
        </VisibilityLabel>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <FieldRFF<InvestmentSchema['internal_demographics_collection']>
              name="internal_demographics_collection"
              type="radio"
              value="yes"
            >
              {({ input }) => <Radio {...input} id="internal_demographics_collection-yes" />}
            </FieldRFF>
            <label htmlFor="internal_demographics_collection-yes">Yes</label>
          </div>

          <div className="flex items-center gap-1.5">
            <FieldRFF<InvestmentSchema['internal_demographics_collection']>
              name="internal_demographics_collection"
              type="radio"
              value="no"
            >
              {({ input }) => <Radio {...input} id="internal_demographics_collection-no" />}
            </FieldRFF>
            <label htmlFor="internal_demographics_collection-no">No</label>
          </div>
        </div>
      </div>
      {collectsInformation === 'yes' && (
        <>
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'demographics',
                className: 'normal-case',
              }}
              required
            >
              If yes, what is the demographic focus of this partner organization?
            </VisibilityLabel>
            <FieldRFF<InvestmentSchema['demographics']>
              name="demographics"
              defaultValue={demographicsFormValues}
            >
              {({ input }) => (
                <div className="space-y-2">
                  <MultiSelect
                    id="demographics"
                    placeholder="Select all that apply"
                    theme="gray"
                    size="base"
                    options={demographicsOptions}
                    values={input.value}
                    loading={demographicsFetching && !demographicsFetched}
                    onSelect={input.onChange}
                  />
                  <ErrorField<InvestmentSchema> name="demographics" />
                </div>
              )}
            </FieldRFF>
          </div>
          {demographicsFormValues?.includes('other') && (
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'demographics_other',
                  className: 'normal-case',
                  'aria-required': true,
                }}
                required
              >
                Other demographics
              </VisibilityLabel>
              <FieldRFF<InvestmentSchema['demographics_other']>
                name="demographics_other"
                type="text"
              >
                {({ input }) => (
                  <div className="space-y-2">
                    <Input required {...input} />
                    <ErrorField<InvestmentSchema> name="demographics_other" />
                  </div>
                )}
              </FieldRFF>
            </div>
          )}
        </>
      )}
    </>
  );
}
