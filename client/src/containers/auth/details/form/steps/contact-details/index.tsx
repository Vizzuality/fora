import { Field as FieldRFF } from 'react-final-form';

import { usePathname } from 'next/navigation';

import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';

import LinkButton from '@/components/button';
import { Input } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import FormLegend from '@/components/forms/legend';
import VisibilityLabel from '@/containers/auth/details/form/label';
import PrimaryContactPhone from '@/containers/auth/details/form/steps/contact-details/primary-contact-phone';
import PrimaryEmailVisibility from '@/containers/auth/details/form/steps/contact-details/primary-email-visibility';
import { FunderSchema } from '@/containers/auth/details/form/validations';

export default function ContactDetailsStep() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="grid grid-cols-12 flex-col gap-2">
        <h3 className="col-span-12 font-display text-2.5xl">Contact Details</h3>
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
                htmlFor: 'primary_contact_first_name',
                'aria-required': true,
              }}
              icon="fora-members"
              required
            >
              Primary Contact - First Name
            </VisibilityLabel>
            <FieldRFF<FunderSchema['primary_contact_first_name']>
              name="primary_contact_first_name"
              type="text"
            >
              {({ input }) => (
                <div className="space-y-2">
                  <Input
                    {...input}
                    id={input.name}
                    required
                    theme="transparent"
                    className="h-[46px]"
                  />
                  <ErrorField<FunderSchema> name="primary_contact_first_name" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>

        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'primary_contact_last_name',
                'aria-required': true,
              }}
              icon="fora-members"
              required
            >
              Primary Contact - Last Name
            </VisibilityLabel>
            <FieldRFF<FunderSchema['primary_contact_last_name']>
              name="primary_contact_last_name"
              type="text"
            >
              {({ input }) => (
                <div className="space-y-2">
                  <Input
                    {...input}
                    id={input.name}
                    required
                    theme="transparent"
                    className="h-[46px]"
                  />
                  <ErrorField<FunderSchema> name="primary_contact_last_name" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 items-end gap-4">
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'primary_contact_email',
                'aria-required': true,
              }}
              required
              icon="fora-members"
            >
              Primary Contact - Email Address
            </VisibilityLabel>
            <FieldRFF<FunderSchema['primary_contact_email']>
              name="primary_contact_email"
              type="email"
            >
              {({ input }) => (
                <div className="space-y-2">
                  <Input
                    {...input}
                    id={input.name}
                    required
                    theme="transparent"
                    className="h-[46px]"
                  />
                  <ErrorField<FunderSchema> name="primary_contact_email" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>

        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'primary_contact_phone',
              }}
            >
              Primary Contact - Phone Number
            </VisibilityLabel>
            <PrimaryContactPhone />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 items-end gap-4">
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'primary_contact_role',
              }}
              icon="fora-members"
            >
              Primary Contact - Role
            </VisibilityLabel>
            <FieldRFF<FunderSchema['primary_contact_role']>
              name="primary_contact_role"
              type="email"
            >
              {({ input }) => (
                <div className="space-y-2">
                  <Input
                    {...input}
                    id={input.name}
                    required
                    theme="transparent"
                    className="h-[46px]"
                  />
                  <ErrorField<FunderSchema> name="primary_contact_role" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>

        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'primary_contact_location',
              }}
              icon="fora-members"
            >
              Primary Contact - Location
            </VisibilityLabel>
            <FieldRFF<FunderSchema['primary_contact_location']>
              name="primary_contact_location"
              type="email"
            >
              {({ input }) => (
                <div className="space-y-2">
                  <Input
                    {...input}
                    id={input.name}
                    required
                    theme="transparent"
                    className="h-[46px]"
                  />
                  <ErrorField<FunderSchema> name="primary_contact_location" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>
      </div>

      <PrimaryEmailVisibility />

      <footer className="flex justify-end gap-4">
        <LinkButton
          theme="outline"
          className="flex items-center gap-1"
          href={`${pathname}?step=funder-details`}
          anchorLinkProps={{
            href: `${pathname}?step=funder-details`,
            replace: true,
          }}
        >
          <LuArrowLeft className="h-[20px] w-[20px]" />
          <span>Funder Details</span>
        </LinkButton>

        <LinkButton
          theme="outline"
          className="flex items-center gap-1"
          href={`${pathname}?step=operations-staff`}
          anchorLinkProps={{
            href: `${pathname}?step=operations-staff`,
            replace: true,
          }}
        >
          <span>Operations & Staff</span>
          <LuArrowRight className="h-[20px] w-[20px]" />
        </LinkButton>
      </footer>
    </div>
  );
}
