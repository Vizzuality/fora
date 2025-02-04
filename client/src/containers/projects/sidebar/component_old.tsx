// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../store/index';
// import { Disclosure } from '@headlessui/react';

// const STEPS = [

//   'project Details',
//   'Contact Information',
//   'Focus Area',
//   'Funding Sources',
// ];

// const StepperSidebar = () => {
//   const dispatch = useDispatch();
//   const currentStep = useSelector(state: RootState) => state.projectForm.currentStep);
//   return (
//     <Disclosure as="nav" className="bg-white shadow-md md:shadow-none md:bg-gray-50">
//       <>
//         <div className='px-4 py-3 border-b md:hidden'>
//           <Disclosure.Button className="flex items-center justify-between w-full">
//             <span className='font-medium'>{STEPS[currentStep]}</span>

//           </Disclosure.Button>
//         </div>

//         <Disclosure.Panel className="p-4 space-y-2 border-b md:hidden">
//             {STEPS.map((step, index) => (
//               <button
//                 key={step}
//                 onClick={() => dispatch(setCurrentStep(index))}
//                 className={`w-full text-left p-2 rounded-md ${
//                   currentStep === index
//                     ? 'bg-blue-100 text-blue-700'
//                     : 'hover:bg-gray-100'
//                 }`}
//               >
//                 {step}
//               </button>
//             ))}
//           </Disclosure.Panel>

//           <div className="hidden p-6 space-y-2 md:block w-72">
//             <h2 className="mb-4 text-lg font-semibold text-gray-700">Project Setup</h2>
//             {STEPS.map((step, index) => (
//               <button
//                 key={step}
//                 onClick={() => dispatch(setCurrentStep(index))}
//                 className={`w-full text-left p-3 rounded-lg transition-colors ${
//                   currentStep === index
//                     ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 {step}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//     </Disclosure>
//   )
// }

// export default StepperSidebar

import { useRouter } from 'next/router';

const steps = [
  { name: 'Project Details', path: 'project-details' },
  { name: 'Contact Details', path: 'contact-details' },
  { name: 'Focus Areas', path: 'focus-areas' },
  { name: 'Funding', path: 'funding' },
];

export default function StepperSidebarOld() {
  const router = useRouter();
  return (
    <aside className="w-64 h-screen p-4 text-black bg-gray-900">
      <ul>
        {steps.map((step) => (
          <li
            key={step.name}
            className="py-2 cursor-pointer"
            onClick={() => router.push(`/project/new?step=${step.path}`)}
          >
            {step.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
