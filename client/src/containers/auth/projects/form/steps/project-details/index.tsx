import { ComponentProps, useState } from 'react';

import { DropzoneOptions } from 'react-dropzone';
import { Field as FieldRFF, useField, useFormState } from 'react-final-form';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { HiOutlineArrowRight } from 'react-icons/hi';

import LinkButton from '@/components/button';
import DragNDrop from '@/components/drag-n-drop';
import { Input, Radio } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';
import FormLegend from '@/components/forms/legend';
import Textarea from '@/components/forms/textarea';
import { Demographic } from '@/types/api/demographic';

import VisibilityLabel from '../../label';
import { ProjectSchema } from '../../validations';

import DemographicsSelector from './demographics';
import LegalStatusSelector from './legal-status';

export default function ProjectDetailsStep() {
  const pathname = usePathname();
  const {
    values: {
      leadership_demographics: demographicsFormValues,
      imageURL,
      internal_leadership_demographics_collection: collectsInformation,
    },
  } = useFormState<ProjectSchema & { imageURL: string }>();
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
        <h3 className="col-span-12 font-display text-2.5xl">Project Details</h3>
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

      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'name',
            'aria-required': true,
          }}
          required
        >
          Project Name
        </VisibilityLabel>
        <FieldRFF<ProjectSchema['name']> name="name" type="text">
          {({ input }) => (
            <div className="space-y-2">
              <Input {...input} id={input.name} required theme="transparent" className="h-[46px]" />
              <ErrorField<ProjectSchema> name="name" />
            </div>
          )}
        </FieldRFF>
      </div>

      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'description',
          }}
          required
        >
          Project Description
        </VisibilityLabel>
        <FieldRFF<ProjectSchema['description']> name="description">
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
              <ErrorField<ProjectSchema> name="description" />
            </div>
          )}
        </FieldRFF>
      </div>

      <div className="grid grid-cols-12 items-start gap-4">
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'website',
              }}
            >
              Website
            </VisibilityLabel>
            <FieldRFF<ProjectSchema['website']> name="website" type="text">
              {({ input }) => (
                <div className="space-y-2">
                  <Input {...input} id={input.name} theme="transparent" className="h-[46px]" />
                  <ErrorField<ProjectSchema> name="website" />
                </div>
              )}
            </FieldRFF>
          </div>
        </div>
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'recipient_legal_status',
              }}
              required
            >
              Legal Status
            </VisibilityLabel>
            <LegalStatusSelector />
          </div>
        </div>
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
      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'internal_leadership_demographics_collection',
            className: 'normal-case',
          }}
          required
        >
          Do you collect information on the leadership demographics of partner organizations?
        </VisibilityLabel>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <FieldRFF<ProjectSchema['internal_leadership_demographics_collection']>
              name="internal_leadership_demographics_collection"
              type="radio"
              value="yes"
            >
              {({ input }) => (
                <Radio {...input} id="internal_leadership_demographics_collection-yes" />
              )}
            </FieldRFF>
            <label htmlFor="internal_leadership_demographics_collection-yes">Yes</label>
          </div>

          <div className="flex items-center gap-1.5">
            <FieldRFF<ProjectSchema['internal_leadership_demographics_collection']>
              name="internal_leadership_demographics_collection"
              type="radio"
              value="no"
            >
              {({ input }) => (
                <Radio {...input} id="internal_leadership_demographics_collection-no" />
              )}
            </FieldRFF>
            <label htmlFor="internal_leadership_demographics_collection-no">No</label>
          </div>
        </div>
      </div>
      {collectsInformation === 'yes' && (
        <>
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'leadership_demographics',
                className: 'normal-case',
              }}
              required
            >
              If yes, what is the leadership demographic of this partner organization?
            </VisibilityLabel>
            <DemographicsSelector />
          </div>
          {demographicsFormValues?.includes(Demographic.Other) && (
            <div className="space-y-2">
              <VisibilityLabel
                labelProps={{
                  htmlFor: 'leadership_demographics_other',
                  className: 'normal-case',
                  'aria-required': true,
                }}
                required
              >
                Other demographics
              </VisibilityLabel>
              <FieldRFF<ProjectSchema['leadership_demographics_other']>
                name="leadership_demographics_other"
                type="text"
              >
                {({ input }) => (
                  <div className="space-y-2">
                    <Input required {...input} />
                    <ErrorField<ProjectSchema> name="leadership_demographics_other" />
                  </div>
                )}
              </FieldRFF>
            </div>
          )}
        </>
      )}
      <footer className="flex justify-end">
        <LinkButton
          theme="outline"
          className="flex items-center gap-1"
          href={`${pathname}?step=contact-details`}
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
