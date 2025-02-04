'use client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// const steps = [
//   { name: "PROJECT DETAILS", step: 1 },
//   { name: "CONTACT DETAILS", step: 2 },
//   { name: "FOCUS AREAS", step: 3 },
//   { name: "FUNDING", step: 4 },
// ];

const steps = [
  { id: 'project-details', name: 'PROJECT DETAILS' },
  { id: 'contact-details', name: 'CONTACT DETAILS' },
  { id: 'focus-area', name: 'FOCUS AREA' },
  { id: 'funding', name: 'FUNDING' },
];
const StepperSidebar = () => {
  // const [active, setActive] = useState('');
  const router = useRouter();
  const { asPath } = router;

  const handleNavigation = (stepId: string) => {
    router.push(`/projects/create-project/${stepId}`, undefined, { shallow: true });
  };


  return (
    // <aside className="w-1/4 p-4 bg-gray-100">
    // <nav>
    //   {steps.map(({ name, step }) => (
    //     <div
    //       key={step}
    //       className={`p-2 mb-2 cursor-pointer rounded-md bg-green-500 text-black : "bg-gray-200"
    //       }`}
    //     >
    //       {name}
    //     </div>
    //   ))}
    // </nav></aside>
    <>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            {/* Mobile Dropdown */}
            <div className="md:hidden p-4 border-b">
              <Disclosure.Button className="flex items-center justify-between w-full">
                <span className="font-medium">
                  {steps.find((step) => asPath.startsWith(`/projects/create-project/${step.id}`))?.name}
                </span>
              </Disclosure.Button>
            </div>

            {/* Sidebar (Desktop) */}
            <div className="hidden md:block p-6">
              <nav className="space-y-2">
                {steps.map((step) => {
                   const isActive = asPath.startsWith(`/projects/create-project/${step.id}`);
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleNavigation(step.id)}
                      className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-green-0 text-gray-700 font-medium border-green-500'
                          : 'text-gray-600 hover:bg-green-0'
                      }`}
                    >
                      {step.name }
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Navigation Panel */}
            <Disclosure.Panel className="md:hidden p-4 space-y-2">
              {steps.map((step) => {
                 const isActive = asPath.startsWith(`/projects/create-project/${step.id}`);
                return (
                  <button
                    key={step.id}
                    onClick={() => handleNavigation(step.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg ${
                      isActive ? 'bg-green-100 text-green-700' : 'text-gray-600'
                    }`}
                  >
                    {step.name}
                  </button>
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default StepperSidebar;
