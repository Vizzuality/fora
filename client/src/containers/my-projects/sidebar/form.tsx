import { useState } from 'react';
import React from 'react';

import { Form } from 'react-final-form';

import ContactDetails from 'containers/my-projects/sidebar/contactDetails';
import FocusAreas from 'containers/my-projects/sidebar/focus_area';
import Funding from 'containers/my-projects/sidebar/funding';

import ProjectDetails from './projectDetails';

interface ProjectFormProps {
  mode?: 'create' | 'edit';
  initialData?: any;
  projectId?: string;
}

const STEPS = [
  { id: 'project-details', name: 'PROJECT DETAILS', component: ProjectDetails },
  { id: 'contact-details', name: 'CONTACT DETAILS', component: ContactDetails },
  { id: 'focus-area', name: 'FOCUS AREA', component: FocusAreas },
  { id: 'funding', name: 'FUNDING', component: Funding },
];

const SideNavigation = ({ currentStep, setCurrentStep }) => (
  <div className="hidden w-64 p-6 space-y-2 md:block">
    {STEPS.map((step) => (
      <button
        key={step.id}
        onClick={() => setCurrentStep(step.id)}
        className={`w-full text-left px-4 py-3 transition-colors ${
          currentStep === step.id
            ? 'bg-green-20 text-gray-700 font-medium border-green-20 rounded-md '
            : 'text-gray-600 hover:bg-green-0'
        }`}
      >
        {step.name}
      </button>
    ))}
  </div>
);

const ProjectForm = ({ initialData }: ProjectFormProps) => {
  const [currentStep, setCurrentStep] = useState(STEPS[0].id);
  const [formValues, setFormValues] = useState(
    initialData || {
      partnerName: '',
      projectWebsite: '',
      projectDescription: '',
      logo: null,
      collectDemographics: 'no',
      leadershipDemographics: [],
      contactName: '',
      email: '',
      focusArea: '',
      fundingAmount: '',
    }
  );

  const handleNextStep = (values) => {
    setFormValues((prev) => ({ ...prev, ...values }));
  };

  const StepComponent = STEPS.find((step) => step.id === currentStep)?.component;

  return (
    <div className="flex flex-col gap-8 lg:p-4 md:flex-row my-2">
      <SideNavigation currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="flex-1 max-w-3xl">
        {StepComponent && (
          <Form
            onSubmit={(values) => {
              handleNextStep(values);
              alert(`Form submitted successfully! ${JSON.stringify(values)}`);
            }}
            initialValues={formValues}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <StepComponent setCurrentStep={setCurrentStep} />
              </form>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
