import { Field as FieldRFF } from 'react-final-form';

import { usePathname } from 'next/navigation';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import VisibilityLabel from '../../label';
import FormLegend from '../../legend';
import { ProjectSchema } from '../../validations';

import PrimaryOfficeCountrySelector from './primary-office-country';
import PrimaryOfficeStateSelector from './primary-office-state';

import LinkButton from '@/components/button';
import { Input } from '@/components/forms';
import ErrorField from '@/components/forms/error-field';

export default function ContactDetailsStep() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="grid grid-cols-12 flex-col gap-2">
        <h3 className="font-display text-2.5xl col-span-12">Contact Details</h3>
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

      <div className="grid grid-cols-12 gap-4 items-end">
        <div className="col-span-6">
          <div className="space-y-2">
            <VisibilityLabel
              labelProps={{
                htmlFor: 'country_id',
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
                htmlFor: 'stated_id',
              }}
            >
              Primary Office State
            </VisibilityLabel>
            <PrimaryOfficeStateSelector />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <VisibilityLabel
          labelProps={{
            htmlFor: 'city',
          }}
          required
        >
          Primary Office City
        </VisibilityLabel>
        <FieldRFF<ProjectSchema['name']> name="city" type="text">
          {({ input }) => (
            <div className="space-y-2">
              <Input {...input} id={input.name} className="h-[46px]" />
              <ErrorField<ProjectSchema> name="city" />
            </div>
          )}
        </FieldRFF>
      </div>

      <footer className="flex justify-end">
        <LinkButton
          theme="outline"
          href={`${pathname}?step=project-details`}
          className="flex items-center gap-2"
          anchorLinkProps={{
            href: `${pathname}?step=project-details`,
            replace: true,
          }}
        >
          <HiOutlineArrowLeft className="w-[20px] h-[20px]" />
          <span>Project Details</span>
        </LinkButton>
      </footer>
    </div>
  );
}
