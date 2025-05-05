import { Field as FieldRFF } from 'react-final-form';

import { usePathname } from 'next/navigation';

import { LuArrowLeft } from 'react-icons/lu';

import LinkButton from '@/components/button';
import { Button } from '@/components/button/component';
import { Input, Radio } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import FormLegend from '@/components/forms/legend';
import { useFunderForm } from '@/containers/auth/details/form';
import VisibilityLabel from '@/containers/auth/details/form/label';
import CapitalTypeSelector from '@/containers/auth/details/form/steps/capital-strategy/capital-type';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { cn } from '@/lib/utils';
import { CapitalType } from '@/types/api/capital-type';

export default function CapitalStrategyStep() {
  const pathname = usePathname();

  const { getState } = useFunderForm();
  const {
    invalid,
    values: { capital_types: capitalTypesFormValues },
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
            'col-span-6': capitalTypesFormValues?.includes(CapitalType.Other),
          })}
        >
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'capital_types',
                'aria-required': true,
              }}
              required
            >
              Capital Deployed
            </VisibilityLabel>
            <CapitalTypeSelector />
          </div>
        </div>
        {capitalTypesFormValues?.includes(CapitalType.Other) && (
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'capital_types_other',
                }}
                icon="fora-members"
              >
                Capital Deployed - Others
              </VisibilityLabel>
              <FieldRFF<FunderSchema['capital_types_other']> name="capital_types_other">
                {({ input }) => (
                  <div className="space-y-2">
                    <Input
                      {...input}
                      id={input.name}
                      required
                      theme="transparent"
                      className="h-[46px]"
                    />
                    <ErrorField<FunderSchema> name="capital_types_other" />
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
            htmlFor: 'spend_down_strategy',
            className: 'normal-case',
          }}
          required
        >
          Do you have a spend down strategy?
        </VisibilityLabel>
        <div className="flex items-center gap-4 pl-1">
          <div className="flex items-center gap-1.5">
            <FieldRFF<FunderSchema['spend_down_strategy']>
              name="spend_down_strategy"
              type="radio"
              value="yes"
            >
              {({ input }) => <Radio {...input} id="spend_down_strategy-yes" />}
            </FieldRFF>
            <label htmlFor="spend_down_strategy-yes">Yes</label>
          </div>

          <div className="flex items-center gap-1.5">
            <FieldRFF<FunderSchema['spend_down_strategy']>
              name="spend_down_strategy"
              type="radio"
              value="no"
            >
              {({ input }) => <Radio {...input} id="spend_down_strategy-no" />}
            </FieldRFF>
            <label htmlFor="spend_down_strategy-no">No</label>
          </div>
        </div>
      </div>

      <footer className="flex justify-between">
        <Button type="submit" theme="green" disabled={invalid}>
          Save changes
        </Button>

        <LinkButton
          theme="outline"
          className="flex items-center gap-1"
          href={`${pathname}?step=focus-collaboration`}
          anchorLinkProps={{
            href: `${pathname}?step=focus-collaboration`,
            replace: true,
          }}
        >
          <LuArrowLeft className="h-[20px] w-[20px]" />
          <span>Focus & Collaboration </span>
        </LinkButton>
      </footer>
    </div>
  );
}
