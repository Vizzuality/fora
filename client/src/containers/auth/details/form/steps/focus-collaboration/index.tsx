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
import AreasSelector from '@/containers/auth/details/form/steps/focus-collaboration/areas';
import DemographicsSelector from '@/containers/auth/details/form/steps/focus-collaboration/demographics';
import GeographicScopeCountriesSelector from '@/containers/auth/details/form/steps/focus-collaboration/geographic-scope-countries';
import GeographicScopeStatesSelector from '@/containers/auth/details/form/steps/focus-collaboration/geographic-scope-states';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { cn } from '@/lib/utils';
import { AreaEnum } from '@/types/api/area';
import { CapitalType } from '@/types/api/capital-type';
import { Demographic } from '@/types/api/demographic';

export default function FocusCollaborationStep() {
  const pathname = usePathname();

  const { getState } = useFunderForm();
  const {
    invalid,
    values: {
      areas: areasFormValues,
      demographics: demographicsFormValues,
      internal_networks: internalNetworksFormValue,
    },
  } = getState();

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="grid grid-cols-12 flex-col gap-2">
        <h3 className="col-span-12 font-display text-2.5xl">Capital and Strategy</h3>
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
        <div
          className={cn('col-span-full', {
            'col-span-6': areasFormValues?.includes(AreaEnum.Other),
          })}
        >
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'areas',
                'aria-required': true,
              }}
              required
            >
              Areas of focus
            </VisibilityLabel>
            <AreasSelector />
          </div>
        </div>
        {areasFormValues?.includes(CapitalType.Other) && (
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'areas_other',
                  'aria-required': true,
                }}
                required
              >
                Areas of Interest - Others
              </VisibilityLabel>
              <FieldRFF<FunderSchema['areas_other']> name="areas_other">
                {({ input }) => (
                  <div className="space-y-2">
                    <Input
                      {...input}
                      id={input.name}
                      required
                      theme="transparent"
                      className="h-[46px]"
                    />
                    <ErrorField<FunderSchema> name="areas_other" />
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
            'col-span-6': demographicsFormValues?.includes(Demographic.Other),
          })}
        >
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'demographics',
                'aria-required': true,
              }}
              required
            >
              Demographics Scope
            </VisibilityLabel>
            <DemographicsSelector />
          </div>
        </div>
        {demographicsFormValues?.includes(Demographic.Other) && (
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'demographics_other',
                  'aria-required': true,
                }}
                required
              >
                Demographics Scope - Others
              </VisibilityLabel>
              <FieldRFF<FunderSchema['demographics_other']> name="demographics_other">
                {({ input }) => (
                  <div className="space-y-2">
                    <Input
                      {...input}
                      id={input.name}
                      required
                      theme="transparent"
                      className="h-[46px]"
                    />
                    <ErrorField<FunderSchema> name="demographics_other" />
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

      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'internal_networks',
            className: 'normal-case',
          }}
          required
        >
          Do you collaborate with other networks/membership organizations?
        </VisibilityLabel>
        <div className="flex items-center gap-4 pl-1">
          <div className="flex items-center gap-1.5">
            <FieldRFF<FunderSchema['internal_networks']>
              name="internal_networks"
              type="radio"
              value="yes"
            >
              {({ input }) => <Radio {...input} id="internal_networks-yes" />}
            </FieldRFF>
            <label htmlFor="internal_networks-yes">Yes</label>
          </div>

          <div className="flex items-center gap-1.5">
            <FieldRFF<FunderSchema['internal_networks']>
              name="internal_networks"
              type="radio"
              value="no"
            >
              {({ input }) => <Radio {...input} id="internal_networks-no" />}
            </FieldRFF>
            <label htmlFor="internal_networks-no">No</label>
          </div>
        </div>
      </div>

      {internalNetworksFormValue === 'yes' && (
        <>
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'networks',
                className: 'normal-case',
                'aria-required': true,
              }}
              required
            >
              If yes, which networks/membership organizations?
            </VisibilityLabel>
            <FieldRFF<FunderSchema['networks']> name="networks" type="text">
              {({ input }) => (
                <div className="space-y-2">
                  <Input required {...input} theme="transparent" className="h-[46px]" />
                  <ErrorField<FunderSchema> name="networks" />
                </div>
              )}
            </FieldRFF>
          </div>
        </>
      )}

      <footer className="flex justify-between">
        <Button type="submit" theme="green" disabled={invalid}>
          Save changes
        </Button>
        <div className="flex justify-end gap-4">
          <LinkButton
            theme="outline"
            className="flex items-center gap-1"
            href={`${pathname}?step=operations-staff`}
            anchorLinkProps={{
              href: `${pathname}?step=operations-staff`,
              replace: true,
            }}
          >
            <LuArrowLeft className="h-[20px] w-[20px]" />
            <span>Operations & Staff</span>
          </LinkButton>

          <LinkButton
            theme="outline"
            className="flex items-center gap-1"
            href={`${pathname}?step=capital-strategy`}
            anchorLinkProps={{
              href: `${pathname}?step=capital-strategy`,
              replace: true,
            }}
          >
            <span>Capital & Strategy</span>
            <LuArrowRight className="h-[20px] w-[20px]" />
          </LinkButton>
        </div>
      </footer>
    </div>
  );
}
