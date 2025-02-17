import React, { useState } from 'react';

import ProjectCard from 'containers/projects/ui/card';

import Icon from 'components/icon';

import CHEVRON_RIGHT from 'svgs/icons/arrow-right.svg?sprite';
import eye from 'svgs/icons/eye.svg?sprite';
import LOCK from 'svgs/icons/lock.svg?sprite';
import upload from 'svgs/icons/upload.svg?sprite';
import USER_TWO from 'svgs/icons/user-two.svg?sprite';
const ProjectDetails = ({ setCurrentStep }) => {
  const [logo, setLogo] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setLogo(event.target.files[0]);
    }
  };

  return (
    <ProjectCard title="Project Name Details">
      <div className=" md:w-full">
        <div className="md:w-[559px] w-full">
          <p className="leading-none">
            {' '}
            Lorem ipsum dolor sit amet consectetur et fringilla pellentesque in ut congue at
            ultrices nulla nibh dolor sit amet pellentesque consectetur.{' '}
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
          {' '}
          <span className="text-red-0">*</span>
          All fields marked with a red asterisk are mandatory to fill
        </div>
        <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2">
          <div className="flex flex-col py-2">
            <label className="flex">
              <Icon icon={eye} className="w-4 h-4 pr-1" />
              PARTNER ORGANIZATION NAME <span className="text-red-0">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col py-2">
            <label className="flex">
              <Icon icon={eye} className="w-4 h-4 pr-1" />
              PROJECT WEBSITE
            </label>
            <input
              type="text"
              className="w-full p-2 mt-2 border border-gray-800 rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="flex pb-3 font-medium text-gray-700 ">
            <Icon icon={eye} className="w-4 h-4 pr-1" />
            Description <span className="text-red-0">*</span>
          </label>
          <textarea className="w-full h-32 p-3 my-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-200"></textarea>
        </div>

        {/* Upload Logo */}
        <div className="mt-6">
          <label className="flex mb-1 font-medium text-gray-700">
            <Icon icon={eye} className="w-4 h-4 pr-1" /> LOGO
          </label>
          <div
            className="flex items-center justify-center w-full p-6 border border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-blue-400"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
            {logo ? (
              <p className="text-gray-700">{logo.name}</p>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <Icon icon={upload} className="block w-9 h-9" />
                <p>Drop file to upload </p>
                <p className="mt-2 text-sm">
                  or <span className="text-green-0">Browse</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="flex mb-1 font-medium text-gray-700">
            <Icon icon={eye} className="w-4 h-4 pr-1" />
            Do you collect information on the leadership demographics of partner organizations
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="projectType"
                value="yes"
                className="text-green-0 form-radio focus:ring-green-0"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="projectType"
                value="no"
                className="text-green-0 form-radio focus:ring-green-0"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="flex mb-1 font-medium text-gray-700">
            <Icon icon={eye} className="w-4 h-4 pr-1" /> If yes, what is the leadership demographic
            of this partner organization? <span className="pl-2 text-red-0">*</span>
          </label>
          <select className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-green-200">
            <option>Select all that apply</option>
            <option>Asian</option>
            <option>Black or African American</option>
            <option>Hispanic or Latinx</option>
            <option>Indigenous/Tribal Nations</option>
          </select>
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={() => setCurrentStep('contact-details')}
            className="flex items-center p-2 mt-6 text-black transition bg-transparent border rounded-lg hover:bg-blue-700"
          >
            Contact Details{' '}
            <span className="pl-2">
              <Icon icon={CHEVRON_RIGHT} className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </ProjectCard>
  );
};

export default ProjectDetails;
