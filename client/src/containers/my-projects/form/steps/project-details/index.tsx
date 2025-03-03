import { useState } from 'react';

import { DropzoneOptions } from 'react-dropzone';
import { Field as FieldRFF, useField, useFormState } from 'react-final-form';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import LinkButton from 'components/button';
import DragNDrop from 'components/drag-n-drop';
import { Input, Radio } from 'components/forms';
import Textarea from 'components/forms/textarea';
import Icon from 'components/icon';

import ARROW_RIGHT_SVG from 'svgs/ui/arrow-right.svg?sprite';

import VisibilityLabel from '../../label';
import FormLegend from '../../legend';
import { ProjectSchema } from '../../validations';

import DemographicsSelector from './demographics';
import LegalStatusSelector from './legal-status';

export default function ProjectDetailsStep() {
  const [collectsInformation, setCollectsInformation] = useState('yes');
  const pathname = usePathname();
  const {
    values: { demographics: demographicsFormValues },
  } = useFormState<ProjectSchema>();
  const logoField = useField('logo');
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onDrop = (files: File[]) => {
    const file = files[0];
    logoField.input.onChange(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const dropZoneOptions: DropzoneOptions = {
    onDropAccepted: onDrop,
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg'],
    },
    multiple: false,
    maxSize: 375000,
  };

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="grid grid-cols-12 flex-col gap-2">
        <h3 className="font-display text-2.5xl col-span-12">Project Details</h3>
        {/*@todo: update text*/}
        <p className="font-semibold col-span-9">
          Lorem ipsum dolor sit amet consectetur et fringilla pellentesque in ut congue at ultrices
          nulla nibh dolor sit amet pellentesque consectetur.
        </p>
      </div>

      <div className="space-y-4">
        <FormLegend />
        <p className="font-semibold text-grey-20 flex items-center gap-1">
          <span className="align-super text-red-0">*</span>
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
          {({ input }) => <Input {...input} id={input.name} required className="h-[46px]" />}
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
        <FieldRFF<ProjectSchema['name']> name="description">
          {({ input }) => (
            <Textarea placeholder="Type the description here" onChange={input.onChange} required />
          )}
        </FieldRFF>
      </div>

      <div className="grid grid-cols-12 gap-4 items-end">
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'website',
              }}
            >
              Website
            </VisibilityLabel>
            <FieldRFF<ProjectSchema['name']> name="website" type="text">
              {({ input }) => <Input {...input} id={input.name} className="h-[46px]" />}
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
            <>{imageSrc && <Image src={imageSrc} width={500} height={500} alt="Uploaded" />}</>
          )}
        </DragNDrop>
      </div>
      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'internal-demographics',
            className: 'normal-case',
          }}
          required
        >
          Do you collect information on the leadership demographics of partner organizations?
        </VisibilityLabel>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Radio
              name="internal-demographics"
              id="internal-demographics-yes"
              value="yes"
              defaultChecked
              onChange={(evt) => setCollectsInformation(evt.target.value)}
            />
            <label htmlFor="internal-demographics-yes">Yes</label>
          </div>

          <div className="flex items-center gap-1">
            <Radio
              name="internal-demographics"
              id="internal-demographics-no"
              value="no"
              onChange={(evt) => setCollectsInformation(evt.target.value)}
            />
            <label htmlFor="internal-demographics-no">No</label>
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
              If yes, what is the leadership demographic of this partner organization?
            </VisibilityLabel>
            <DemographicsSelector />
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
              <FieldRFF<ProjectSchema['demographics_other']> name="demographics_other" type="text">
                {({ input }) => <Input required {...input} />}
              </FieldRFF>
            </div>
          )}
        </>
      )}
      <footer className="flex justify-end">
        <LinkButton
          theme="outline"
          href={`${pathname}?step=contact-details`}
          className="flex items-center gap-1"
        >
          <span>Contact Details</span>
          <Icon icon={ARROW_RIGHT_SVG} className="w-[14px] h-[14px]" />
        </LinkButton>
      </footer>
    </div>
  );
}
