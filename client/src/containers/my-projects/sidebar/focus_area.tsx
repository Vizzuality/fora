import React from 'react';

import { Field } from 'react-final-form';

import ProjectCard from 'containers/projects/ui/card';

import Icon from 'components/icon';

import CHEVRON_LEFT from 'svgs/icons/arrow-left.svg?sprite';
import CHEVRON_RIGHT from 'svgs/icons/arrow-right.svg?sprite';
import eye from 'svgs/icons/eye.svg?sprite';
import LOCK from 'svgs/icons/lock.svg?sprite';
import USER_TWO from 'svgs/icons/user-two.svg?sprite';

const FocusAreas = ({ setCurrentStep }) => {
  return (
    <ProjectCard title="Project Name Focus Areas">
      <div className="md:w-full">
        <div className="md:w-[559px] w-full">
          <p>Lorem ipsum dolor sit amet consectetur...</p>

          <div className="lg:flex block lg:gap-4 p-2 my-5 rounded-xl bg-grey-60 ">
            <div className="flex items-center gap-1 my-1 lg:my-0">
              <Icon icon={LOCK} className="w-4 h-4" /> Private Information
            </div>
            <div className="flex items-center gap-1 my-1 lg:my-0">
              <Icon icon={eye} className="w-4 h-4" /> Aggregated Information
            </div>
            <div className="flex items-center gap-1 my-1 lg:my-0">
              <Icon icon={USER_TWO} className="w-4 h-4" /> Only FORA members
            </div>
          </div>
        </div>

        <div className="flex gap-2 text-[14px]/[10px] pb-3">
          <span className="text-red-0">*</span>
          All fields marked with a red asterisk are mandatory.
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2">
          {/* AREA OF INTEREST */}
          <div className="flex flex-col mt-4">
            <label className="flex mb-1 font-medium text-gray-700">
              <Icon icon={eye} className="w-4 h-4 pr-1" /> AREA OF INTEREST{' '}
              <span className="pl-2 text-red-0">*</span>
            </label>
            <Field name="focusArea">
              {({ input }) => (
                <select
                  {...input}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-green-200"
                >
                  <option value="">Select all that apply</option>
                  <option value="AgTech">AgTech</option>
                  <option value="Agroforestry">Agroforestry</option>
                  <option value="Agrovoltaics">Agrovoltaics</option>
                </select>
              )}
            </Field>
          </div>

          {/* DEMOGRAPHIC FOCUS */}
          <div className="flex flex-col mt-4">
            <label className="flex mb-1 font-medium text-gray-700">
              <Icon icon={eye} className="w-4 h-4 pr-1" /> DEMOGRAPHIC FOCUS{' '}
              <span className="pl-2 text-red-0">*</span>
            </label>
            <Field name="demographicFocus">
              {({ input }) => (
                <select
                  {...input}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-green-200"
                >
                  <option value="">Select all that apply</option>
                  <option value="Asian">Asian</option>
                  <option value="Black or African American">Black or African American</option>
                  <option value="Hispanic or Latinx">Hispanic or Latinx</option>
                </select>
              )}
            </Field>
          </div>

          {/* GEOGRAPHIC FOCUS - COUNTRIES */}
          <div className="flex flex-col mt-4">
            <label className="flex mb-1 font-medium text-gray-700">
              <Icon icon={eye} className="w-4 h-4 pr-1" /> GEOGRAPHIC FOCUS - COUNTRIES{' '}
              <span className="pl-2 text-red-0">*</span>
            </label>
            <Field name="geographicFocusCountry">
              {({ input }) => (
                <select
                  {...input}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-green-200"
                >
                  <option value="">Select all that apply</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="India">India</option>
                </select>
              )}
            </Field>
          </div>

          {/* GEOGRAPHIC FOCUS - STATES */}
          <div className="flex flex-col mt-4">
            <label className="flex mb-1 font-medium text-gray-700">
              <Icon icon={eye} className="w-4 h-4 pr-1" /> GEOGRAPHIC FOCUS - STATES{' '}
              <span className="pl-2 text-red-0">*</span>
            </label>
            <Field name="geographicFocusState">
              {({ input }) => (
                <select
                  {...input}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-green-200"
                >
                  <option value="">Select all that apply</option>
                  <option value="California">California</option>
                  <option value="New York">New York</option>
                  <option value="Texas">Texas</option>
                </select>
              )}
            </Field>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setCurrentStep('contact-details')}
            className="flex items-center p-2 mt-6 text-black transition bg-transparent border rounded-lg hover:bg-blue-700"
          >
            <span className="pr-2">
              <Icon icon={CHEVRON_LEFT} className="w-3 h-3" />
            </span>
            Contact Details
          </button>

          <button
            onClick={() => setCurrentStep('funding')}
            className="flex items-center p-2 mt-6 text-black transition bg-transparent border rounded-lg hover:bg-blue-700"
          >
            Funding
            <span className="pl-2">
              <Icon icon={CHEVRON_RIGHT} className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </ProjectCard>
  );
};

export default FocusAreas;
