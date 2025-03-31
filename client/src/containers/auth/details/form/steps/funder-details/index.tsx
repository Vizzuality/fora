import { ComponentProps, useState } from 'react';

import { DropzoneOptions } from 'react-dropzone';
import { Field as FieldRFF, useField } from 'react-final-form';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { HiOutlineArrowRight } from 'react-icons/hi';

import LinkButton from '@/components/button';
import DragNDrop from '@/components/drag-n-drop';
import { Input, Select } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import FormLegend from '@/components/forms/legend';
import Textarea from '@/components/forms/textarea';
import { useFunderForm } from '@/containers/auth/details/form';
import { YEARS_JOINED_FORA_RANGE } from '@/containers/auth/details/form/constants';
import VisibilityLabel from '@/containers/auth/details/form/label';
import LegalStatusSelector from '@/containers/auth/details/form/steps/funder-details/legal-status';
import OrganizationTypeSelector from '@/containers/auth/details/form/steps/funder-details/organization-type';
import PrimaryOfficeCountrySelector from '@/containers/auth/details/form/steps/funder-details/primary-office-country';
import PrimaryOfficeStateSelector from '@/containers/auth/details/form/steps/funder-details/primary-office-state';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import { cn } from '@/lib/utils';

const joinedForaOptions = Array.from(
  {
    length:
      YEARS_JOINED_FORA_RANGE[YEARS_JOINED_FORA_RANGE.length - 1] - YEARS_JOINED_FORA_RANGE[0] + 1,
  },
  (_, i) => ({
    value: (YEARS_JOINED_FORA_RANGE[0] + i).toString(),
    label: (YEARS_JOINED_FORA_RANGE[0] + i).toString(),
  }),
);

export default function FunderDetailsStep() {
  const pathname = usePathname();

  const { getState } = useFunderForm();
  const {
    values: {
      imageURL,
      funder_legal_status: legalStatusFormValue,
      organization_type: organizationTypeFormValue,
    },
  } = getState();
  const logoField = useField('logo');
  const [imageSrc, setImageSrc] = useState<string | null>(imageURL ?? null);

  const onDropAccepted = (files: File[]) => {
    const file = files[0];
    logoField.input.onChange(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const dropZoneOptions: DropzoneOptions &
    Pick<ComponentProps<typeof DragNDrop>, 'hasInitialValue'> = {
    onDropAccepted,
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg'],
    },
    multiple: false,
    maxSize: 375000,
    hasInitialValue: !!imageURL,
  };

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="grid grid-cols-12 flex-col gap-2">
        <h3 className="col-span-12 font-display text-2.5xl">Funder Details</h3>
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
                htmlFor: 'name',
                'aria-required': true,
              }}
              required
            >
              Organization Name
            </VisibilityLabel>
            <FieldRFF<FunderSchema['name']> name="name" type="text">
              {({ input }) => (
                <div className="space-y-2">
                  <Input
                    {...input}
                    id={input.name}
                    required
                    theme="transparent"
                    className="h-[46px]"
                  />
                  <ErrorField<FunderSchema> name="name" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>

        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'date_joined_fora',
                'aria-required': true,
              }}
              required
            >
              Year joined FORA
            </VisibilityLabel>
            <FieldRFF<FunderSchema['date_joined_fora']> name="date_joined_fora">
              {({ input }) => (
                <div className="space-y-2">
                  <Select
                    id="date_joined_fora"
                    placeholder="Select an option"
                    theme="gray"
                    size="base"
                    options={joinedForaOptions}
                    value={new Date(input.value).getFullYear().toString()}
                    onSelect={(year) => {
                      input.onChange(new Date(`${year}-01-01`).toISOString());
                    }}
                  />
                  <ErrorField<FunderSchema> name="date_joined_fora" />
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
                htmlFor: 'primary_office_country_id',
              }}
              required
            >
              Primary Office Country
            </VisibilityLabel>
            <PrimaryOfficeCountrySelector />
          </div>
        </div>
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'primary_office_state_id',
              }}
            >
              Primary Office State
            </VisibilityLabel>
            <PrimaryOfficeStateSelector />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 items-end gap-4">
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'primary_office_city',
              }}
              required
            >
              Primary Office City
            </VisibilityLabel>
            <FieldRFF<FunderSchema['primary_office_city']> name="primary_office_city" type="text">
              {({ input }) => (
                <div className="space-y-2">
                  <Input {...input} id={input.name} className="h-[46px]" />
                  <ErrorField<FunderSchema> name="primary_office_city" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'primary_office_address',
              }}
              icon="fora-members"
            >
              Primary Office Street
            </VisibilityLabel>
            <FieldRFF<FunderSchema['primary_office_address']>
              name="primary_office_address"
              type="text"
            >
              {({ input }) => (
                <div className="space-y-2">
                  <Input {...input} id={input.name} className="h-[46px]" />
                  <ErrorField<FunderSchema> name="primary_office_address" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>
      </div>
      <div className="col-span-full">
        <div className="space-y-2">
          <VisibilityLabel
            labelProps={{
              htmlFor: 'website',
            }}
          >
            Organization Website
          </VisibilityLabel>
          <FieldRFF<FunderSchema['website']> name="website" type="text">
            {({ input }) => (
              <div className="space-y-2">
                <Input {...input} id={input.name} className="h-[46px]" />
                <ErrorField<FunderSchema> name="website" />
              </div>
            )}
          </FieldRFF>
        </div>
      </div>

      <div className="grid grid-cols-12 items-end gap-4">
        <div
          className={cn('col-span-12', {
            'col-span-6': organizationTypeFormValue === 'other',
          })}
        >
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'organization_type',
              }}
              required
            >
              Organization Type
            </VisibilityLabel>
            <OrganizationTypeSelector />
          </div>
        </div>
        {organizationTypeFormValue === 'other' && (
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'organization_type_other',
                  'aria-required': true,
                }}
                required
              >
                Other Organization Type
              </VisibilityLabel>
              <FieldRFF<FunderSchema['organization_type_other']>
                name="organization_type_other"
                type="text"
              >
                {({ input }) => (
                  <div className="space-y-2">
                    <Input required {...input} className="h-[46px]" />
                    <ErrorField<FunderSchema> name="organization_type_other" />
                  </div>
                )}
              </FieldRFF>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 items-end gap-4">
        <div
          className={cn('col-span-12', {
            'col-span-6': legalStatusFormValue === 'other',
          })}
        >
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'funder_legal_status',
              }}
              required
            >
              Legal Status
            </VisibilityLabel>
            <LegalStatusSelector />
          </div>
        </div>
        {legalStatusFormValue === 'other' && (
          <div className="col-span-6">
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'funder_legal_status_other',
                  'aria-required': true,
                }}
                required
              >
                Other Legal Status
              </VisibilityLabel>
              <FieldRFF<FunderSchema['funder_legal_status_other']>
                name="funder_legal_status_other"
                type="text"
              >
                {({ input }) => (
                  <div className="space-y-2">
                    <Input required {...input} className="h-[46px]" />
                    <ErrorField<FunderSchema> name="funder_legal_status_other" />
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
            htmlFor: 'description',
          }}
          required
        >
          Organization Description
        </VisibilityLabel>
        <FieldRFF<FunderSchema['description']> name="description">
          {({ input }) => (
            <div className="space-y-2">
              <Textarea
                placeholder="Type the description here"
                theme="light"
                className="min-h-[46px]"
                {...input}
                onChange={input.onChange}
                required
              />
              <ErrorField<FunderSchema> name="description" />
            </div>
          )}
        </FieldRFF>
      </div>

      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'logo',
          }}
        >
          Logo
        </VisibilityLabel>
        <DragNDrop {...dropZoneOptions}>
          {() => (
            <>
              {imageSrc && (
                <Image src={imageSrc} width={500} height={500} priority alt="Uploaded" />
              )}
            </>
          )}
        </DragNDrop>
      </div>

      <footer className="flex justify-end">
        <LinkButton
          theme="outline"
          href={`${pathname}?step=contact-details`}
          className="flex items-center gap-2"
          anchorLinkProps={{
            href: `${pathname}?step=contact-details`,
            replace: true,
          }}
        >
          <span>Contact Details</span>
          <HiOutlineArrowRight className="h-[20px] w-[20px]" />
        </LinkButton>
      </footer>
    </div>
  );
}
