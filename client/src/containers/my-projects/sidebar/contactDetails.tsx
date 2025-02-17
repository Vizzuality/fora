import React from 'react';

import { Field } from 'react-final-form';

import ProjectCard from 'containers/projects/ui/card';

import Icon from 'components/icon';

import CHEVRON_LEFT from 'svgs/icons/arrow-left.svg?sprite';
import CHEVRON_RIGHT from 'svgs/icons/arrow-right.svg?sprite';
import eye from 'svgs/icons/eye.svg?sprite';
import LOCK from 'svgs/icons/lock.svg?sprite';
import USER_TWO from 'svgs/icons/user-two.svg?sprite';

const ContactDetails = ({ setCurrentStep }) => {
  return (
    <ProjectCard title="Project Name Contact Details">
      <div className="md:w-full">
        <div className="md:w-[559px] w-full">
          <p>
            Lorem ipsum dolor sit amet consectetur et fringilla pellentesque in ut congue at
            ultrices nulla nibh dolor sit amet pellentesque consectetur.
          </p>
          <div className="lg:flex block space-y-2 gap-4 p-2 my-5 rounded-xl bg-grey-60">
            <div className="flex items-center gap-1">
              <Icon icon={LOCK} className="w-4 h-4" />
              Private Information
            </div>
            <div className="flex items-center gap-1">
              <Icon icon={eye} className="w-4 h-4" />
              Aggregated Information
            </div>
            <div className="flex items-center gap-1">
              <Icon icon={USER_TWO} className="w-4 h-4" />
              Only FORA members
            </div>
          </div>
        </div>

        <div className="flex gap-2 text-[14px]/[10px] pb-3">
          <span className="text-red-0">*</span>
          All fields marked with a red asterisk are mandatory to fill
        </div>

        {/* Use Field from react-final-form */}
        <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2">
          <div className="flex flex-col py-2">
            <label className="flex">
              <Icon icon={eye} className="w-4 h-4 pr-1" />
              PRIMARY OFFICE COUNTRY <span className="text-red-0 PL-2">*</span>
            </label>
            <Field name="primaryOfficeCountry">
              {({ input }) => (
                <input
                  {...input}
                  type="text"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-200"
                />
              )}
            </Field>
          </div>

          <div className="flex flex-col py-2">
            <label className="flex">
              <Icon icon={eye} className="w-4 h-4 pr-1" />
              PRIMARY OFFICE CITY OR STATE <span className="text-red-0 PL-2">*</span>
            </label>
            <Field name="primaryOfficeCity">
              {({ input }) => (
                <input
                  {...input}
                  type="text"
                  className="w-full p-2 mt-2 border border-gray-800 rounded-lg outline-none focus:ring focus:ring-blue-200"
                />
              )}
            </Field>
          </div>

          <div className="flex flex-col py-2">
            <label className="flex">
              <Icon icon={USER_TWO} className="w-4 h-4 pr-1" />
              PRIMARY OFFICE STREET
            </label>
            <Field name="primaryOfficeStreet">
              {({ input }) => (
                <input
                  {...input}
                  type="text"
                  className="w-full p-2 mt-2 border border-gray-800 rounded-lg outline-none focus:ring focus:ring-blue-200"
                />
              )}
            </Field>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setCurrentStep('project-details')}
            className="flex items-center p-2 mt-6 text-black transition bg-transparent border rounded-lg hover:bg-blue-700"
          >
            <span className="pr-2">
              <Icon icon={CHEVRON_LEFT} className="w-3 h-3" />
            </span>
            Project Details
          </button>

          <button
            onClick={() => setCurrentStep('focus-area')}
            className="flex items-center p-2 mt-6 text-black transition bg-transparent border rounded-lg hover:bg-blue-700"
          >
            Focus Areas{' '}
            <span className="pl-2">
              <Icon icon={CHEVRON_RIGHT} className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </ProjectCard>
  );
};

export default ContactDetails;
