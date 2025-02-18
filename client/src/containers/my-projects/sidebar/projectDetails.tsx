import React from 'react';

import { Field, useForm, useFormState } from 'react-final-form';

import ProjectCard from 'containers/projects/ui/card';

import Icon from 'components/icon';

import CHEVRON_RIGHT from 'svgs/icons/arrow-right.svg?sprite';
import eye from 'svgs/icons/eye.svg?sprite';
import LOCK from 'svgs/icons/lock.svg?sprite';
import upload from 'svgs/icons/upload.svg?sprite';
import USER_TWO from 'svgs/icons/user-two.svg?sprite';

const ProjectDetails = ({ setCurrentStep }) => {
  const { change } = useForm();
  const { values } = useFormState(); // Get form values

  const handleFileChange = (event) => {
    if (event.target.files?.[0]) {
      change('logo', event.target.files[0]);
    }
  };

  return (
    <ProjectCard title="Project Name Details">
      <div className="md:w-full">
        <div className="md:w-[559px] w-full">
          <p className="leading-none">
            Lorem ipsum dolor sit amet consectetur et fringilla pellentesque in ut congue at
            ultrices nulla nibh dolor sit amet pellentesque consectetur.
          </p>
          <div className="lg:flex block space-y-2 gap-4 p-2 my-5 rounded-xl bg-grey-60">
            <div className="flex items-center gap-1">
              <Icon icon={LOCK} className="w-4 h-4" /> Private Information
            </div>
            <div className="flex items-center gap-1">
              <Icon icon={eye} className="w-4 h-4" /> Aggregated Information
            </div>
            <div className="flex items-center gap-1">
              <Icon icon={USER_TWO} className="w-4 h-4" /> Only FORA members
            </div>
          </div>
        </div>

        <div className="flex gap-2 text-[14px]/[10px] pb-3">
          <span className="text-red-0">*</span>
          All fields marked with a red asterisk are mandatory to fill
        </div>

        <Field name="partnerName">
          {({ input }) => (
            <div className="flex flex-col py-2">
              <label className="flex">
                <Icon icon={eye} className="w-4 h-4 pr-1" /> PARTNER ORGANIZATION NAME{' '}
                <span className="text-red-0">*</span>
              </label>
              <input {...input} type="text" className="w-full p-2 mt-2 border rounded-lg" />
            </div>
          )}
        </Field>

        <Field name="projectWebsite">
          {({ input }) => (
            <div className="flex flex-col py-2">
              <label className="flex">
                <Icon icon={eye} className="w-4 h-4 pr-1" /> PROJECT WEBSITE
              </label>
              <input {...input} type="text" className="w-full p-2 mt-2 border rounded-lg" />
            </div>
          )}
        </Field>

        <Field name="projectDescription">
          {({ input }) => (
            <div className="mt-6">
              <label className="flex pb-3 font-medium text-gray-700">
                <Icon icon={eye} className="w-4 h-4 pr-1" /> Description{' '}
                <span className="text-red-0">*</span>
              </label>
              <textarea {...input} className="w-full h-32 p-3 my-3 border rounded-lg" />
            </div>
          )}
        </Field>

        {/* Upload Logo */}
        <div className="mt-6">
          <label className="flex mb-1 font-medium text-gray-700">
            <Icon icon={eye} className="w-4 h-4 pr-1" /> LOGO
          </label>
          <div
            className="flex items-center justify-center w-full p-6 border border-dashed rounded-lg cursor-pointer hover:border-blue-400"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
            <Field name="logo">
              {({ input }) =>
                input.value ? (
                  <p className="text-gray-700">{input.value.name}</p>
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Icon icon={upload} className="block w-9 h-9" />
                    <p>Drop file to upload</p>
                    <p className="mt-2 text-sm">
                      or <span className="text-green-0">Browse</span>
                    </p>
                  </div>
                )
              }
            </Field>
          </div>
        </div>

        <Field name="leadershipData">
          {({ input }) => (
            <div className="mt-6">
              <label className="flex mb-1 font-medium text-gray-700">
                <Icon icon={eye} className="w-4 h-4 pr-1" />
                Do you collect information on leadership demographics?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    {...input}
                    type="radio"
                    value="yes"
                    className="form-radio"
                    checked={input.value === 'yes'}
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    {...input}
                    type="radio"
                    value="no"
                    className="form-radio"
                    checked={input.value === 'no'}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          )}
        </Field>

        {values.leadershipData === 'yes' && (
          <Field name="leadershipDemographics">
            {({ input }) => (
              <div className="flex flex-col mt-4">
                <label className="flex mb-1 font-medium text-gray-700">
                  <Icon icon={eye} className="w-4 h-4 pr-1" />
                  If yes, what is the leadership demographic?
                  <span className="pl-2 text-red-0">*</span>
                </label>
                <select {...input} className="w-full p-3 border rounded-lg">
                  <option value="">Select all that apply</option>
                  <option value="Asian">Asian</option>
                  <option value="Black or African American">Black or African American</option>
                  <option value="Hispanic or Latinx">Hispanic or Latinx</option>
                  <option value="Indigenous/Tribal Nations">Indigenous/Tribal Nations</option>
                </select>
              </div>
            )}
          </Field>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setCurrentStep('contact-details')}
            className="flex items-center p-2 mt-6 border rounded-lg hover:bg-blue-700"
          >
            Contact Details <Icon icon={CHEVRON_RIGHT} className="w-3 h-3 pl-2" />
          </button>
        </div>
      </div>
    </ProjectCard>
  );
};

export default ProjectDetails;
