import { Field as FieldRFF } from 'react-final-form';

import { usePathname } from 'next/navigation';

import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';

import LinkButton from '@/components/button';
import { Button } from '@/components/button/component';
import { Input, Radio } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import FormLegend from '@/components/forms/legend';
import { useFunderForm } from '@/containers/auth/details/form';
import VisibilityLabel from '@/containers/auth/details/form/label';
import ApplicationStatusSelector from '@/containers/auth/details/form/steps/operations-staff/application-status';
import CapitalAcceptanceSelector from '@/containers/auth/details/form/steps/operations-staff/capital-acceptance';
import DemographicsSelector from '@/containers/auth/details/form/steps/operations-staff/demographics';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { cn } from '@/lib/utils';
import { CapitalAcceptances } from '@/types/api/capital-acceptance';

export default function OperationsStaffStep() {
  const pathname = usePathname();

  const { getState } = useFunderForm();
  const {
    invalid,
    values: {
      capital_acceptances: capitalAcceptancesFormValues,
      leadership_demographics: leadershipDemographicsFormValues,
    },
  } = getState();

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="grid grid-cols-12 flex-col gap-2">
        <h3 className="col-span-12 font-display text-2.5xl">Operations and Staff</h3>
        {/*@todo: update text*/}
        <p className="col-span-9 font-semibold">
          Lorem ipsum dolor sit amet consectetur et fringilla pellentesque in ut congue at ultrices
          nulla nibh dolor sit amet pellentesque consectetur.
        </p>
      </div>

      <div className="space-y-4">
        <FormLegend />
        <p className="flex items-start gap-1 font-semibold text-grey-20">
          <span className="text-red-0">*</span>
          All fields marked with a red asterisk are mandatory to fill
        </p>
      </div>

      <div className="grid grid-cols-12 items-end gap-4">
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'number_staff_employees',
                'aria-required': true,
              }}
              icon="fora-members"
              required
            >
              Staff employees - Number
            </VisibilityLabel>
            <FieldRFF<FunderSchema['number_staff_employees']>
              name="number_staff_employees"
              type="number"
            >
              {({ input }) => (
                <div className="space-y-2">
                  <Input
                    {...input}
                    id={input.name}
                    required
                    theme="transparent"
                    className="h-[46px]"
                    onChange={(evt) => {
                      input.onChange(Number(evt.target.value));
                    }}
                  />
                  <ErrorField<FunderSchema> name="number_staff_employees" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>

        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'application_status',
                'aria-required': true,
              }}
              icon="fora-members"
              required
            >
              Funding Application Status
            </VisibilityLabel>
            <ApplicationStatusSelector />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 items-end gap-4">
        <div
          className={cn('col-span-full', {
            'col-span-6': capitalAcceptancesFormValues?.includes(CapitalAcceptances.Other),
          })}
        >
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'capital_acceptances',
                'aria-required': true,
              }}
              required
              icon="fora-members"
            >
              Capital Acceptance
            </VisibilityLabel>
            <CapitalAcceptanceSelector />
          </div>
        </div>
        {capitalAcceptancesFormValues?.includes(CapitalAcceptances.Other) && (
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'application_status',
                  'aria-required': true,
                }}
                icon="fora-members"
                required
              >
                Capital Acceptance - Others
              </VisibilityLabel>
              <FieldRFF<FunderSchema['capital_acceptances_other']> name="capital_acceptances_other">
                {({ input }) => (
                  <div className="space-y-2">
                    <Input
                      {...input}
                      id={input.name}
                      required
                      theme="transparent"
                      className="h-[46px]"
                    />
                    <ErrorField<FunderSchema> name="capital_acceptances_other" />
                  </div>
                )}
              </FieldRFF>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 items-end gap-4">
        <div
          className={cn('col-span-full', {
            'col-span-6': leadershipDemographicsFormValues?.includes(CapitalAcceptances.Other),
          })}
        >
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'leadership_demographics',
                'aria-required': true,
              }}
              required
              icon="fora-members"
            >
              Leadership Demographics
            </VisibilityLabel>
            <DemographicsSelector />
          </div>
        </div>
        {leadershipDemographicsFormValues?.includes(CapitalAcceptances.Other) && (
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'leadership_demographics_other',
                  'aria-required': true,
                }}
                icon="fora-members"
                required
              >
                Leadership Demographics - Others
              </VisibilityLabel>
              <FieldRFF<
                FunderSchema['leadership_demographics_other']
              > name="leadership_demographics_other">
                {({ input }) => (
                  <div className="space-y-2">
                    <Input
                      {...input}
                      id={input.name}
                      required
                      theme="transparent"
                      className="h-[46px]"
                    />
                    <ErrorField<FunderSchema> name="leadership_demographics_other" />
                  </div>
                )}
              </FieldRFF>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'new_to_regenerative_ag',
            className: 'normal-case',
          }}
          required
        >
          Are you new to regenerative agriculture and, as such, have not yet made any investments or
          funding in this sector?
        </VisibilityLabel>
        <div className="flex items-center gap-4 pl-1">
          <div className="flex items-center gap-1.5">
            <FieldRFF<FunderSchema['new_to_regenerative_ag']>
              name="new_to_regenerative_ag"
              type="radio"
              value="yes"
            >
              {({ input }) => <Radio {...input} id="new_to_regenerative_ag-yes" />}
            </FieldRFF>
            <label htmlFor="new_to_regenerative_ag-yes">Yes</label>
          </div>

          <div className="flex items-center gap-1.5">
            <FieldRFF<FunderSchema['new_to_regenerative_ag']>
              name="new_to_regenerative_ag"
              type="radio"
              value="no"
            >
              {({ input }) => <Radio {...input} id="new_to_regenerative_ag-no" />}
            </FieldRFF>
            <label htmlFor="new_to_regenerative_ag-no">No</label>
          </div>
        </div>
      </div>

      <footer className="flex justify-between">
        <Button type="submit" theme="green" disabled={invalid}>
          Save changes
        </Button>
        <div className="flex justify-end gap-4">
          <LinkButton
            theme="outline"
            className="flex items-center gap-1"
            href={`${pathname}?step=contact-details`}
            anchorLinkProps={{
              href: `${pathname}?step=contact-details`,
              replace: true,
            }}
          >
            <LuArrowLeft className="h-[20px] w-[20px]" />
            <span>Contact Details</span>
          </LinkButton>

          <LinkButton
            theme="outline"
            className="flex items-center gap-1"
            href={`${pathname}?step=focus-collaboration`}
            anchorLinkProps={{
              href: `${pathname}?step=focus-collaboration`,
              replace: true,
            }}
          >
            <span>Focus & Collaboration</span>
            <LuArrowRight className="h-[20px] w-[20px]" />
          </LinkButton>
        </div>
      </footer>
    </div>
  );
}
