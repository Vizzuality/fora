import ProjectCard from 'containers/projects/ui/card';
import React from 'react';
import Link from 'next/link';
import Icon from 'components/icon';
import eye from 'svgs/icons/eye.svg?sprite';
import upload from 'svgs/icons/upload.svg?sprite';
import CHEVRON_RIGHT from 'svgs/icons/arrow-right.svg?sprite';
import CHEVRON_LEFT from 'svgs/icons/arrow-left.svg?sprite';
import LOCK from 'svgs/icons/lock.svg?sprite';
import USER_TWO from 'svgs/icons/user-two.svg?sprite';

const FocusAreas = () => {
  return (
    <ProjectCard title="Project Name Focus Areas">
      <div className="md:w-full">
        <div className="md:w-[559px] w-full">
          <p className="">
            Lorem ipsum dolor sit amet consectetur et fringilla pellentesque in ut congue at
            ultrices nulla nibh dolor sit amet pellentesque consectetur.
          </p>
          <div className="flex gap-4 p-2 my-5 rounded-xl bg-grey-60">
            <Link href="/projects/new/project-details" className="flex">
              <Icon icon={LOCK} className="w-4 h-4 pr-1" />
              Private Information
            </Link>
            <Link href="/projects/new/project-details" className="flex">
              <Icon icon={eye} className="w-4 h-4 pr-1" />
              Aggregated Information
            </Link>
            <Link href="" className="flex">
              <Icon icon={USER_TWO} className="w-4 h-4 pr-1" />
              Only FORA members
            </Link>
          </div>
        </div>

        <div className="flex gap-2 text-[14px]/[10px] pb-3">
          {' '}
          <span className="text-red-0">*</span>
          All fields marked with a red asterisk are mandatory to fill
        </div>

        <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2">
          <div className="flex flex-col mt-4">
            <label className="flex mb-1 font-medium text-gray-700">
              <Icon icon={eye} className="w-4 h-4 pr-1" /> AREA OF INTEREST{' '}
              <span className="pl-2 text-red-0">*</span>
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-green-200">
              <option className="text-sm">Select all that apply</option>
            </select>
          </div>

          <div className="flex flex-col mt-4">
            <label className="flex mb-1 font-medium text-gray-700">
              <Icon icon={eye} className="w-4 h-4 pr-1" /> DEMOGRAPHIC FOCUS{' '}
              <span className="pl-2 text-red-0">*</span>
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-green-200">
              <option className="text-sm">Select all that apply</option>
            </select>
          </div>

          <div className="flex flex-col mt-4">
            <label className="flex mb-1 font-medium text-gray-700">
              <Icon icon={eye} className="w-4 h-4 pr-1" /> GEOGRAPHIC FOCUS - COUNTRIES{' '}
              <span className="pl-2 text-red-0">*</span>
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-green-200">
              <option className="text-sm">Select all that apply</option>
            </select>
          </div>

          <div className="flex flex-col mt-4">
            <label className="flex mb-1 font-medium text-gray-700">
              <Icon icon={eye} className="w-4 h-4 pr-1" /> GEOGRAPHIC FOCUS - STATES
              <span className="pl-2 text-red-0">*</span>
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-green-200">
              <option className="text-sm">Select all that apply</option>
            </select>
          </div>

        
        </div>
        <div className="flex justify-end gap-4">
          <div className="flex items-center justify-end">
            <button className="flex items-center p-2 mt-6 text-black transition bg-transparent border rounded-lg hover:bg-blue-700">
              <span className="pr-2">
                <Icon icon={CHEVRON_LEFT} className="w-3 h-3" />
              </span>
              Contact Details
            </button>
          </div>

          <div className="flex items-center justify-end">
            <button className="flex items-center p-2 mt-6 text-black transition bg-transparent border rounded-lg hover:bg-blue-700">
              Investment{' '}
              <span className="pl-2">
                <Icon icon={CHEVRON_RIGHT} className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </ProjectCard>
  );
};

export default FocusAreas;
