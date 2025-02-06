import { useRouter } from 'next/router';
import { useState } from 'react';
import NewProj from './component';
import ContactDetails from 'containers/projects/sidebar/contactDetails';
import FocusAreas from 'containers/projects/sidebar/focusArea';
import Funding from 'containers/projects/sidebar/funding';
import { Form } from 'react-final-form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

interface FormValues {
  name: string;
  description: string;
  logo: File | null;
  contact_first_name: string;
  contact_last_name: string;
  website: string;
  country_id: number | null;
  state_id: number | null;
  city: string;
  leadership_demographics_other: string;
  recipient_legal_status: string;
  leadership_demographics: string[];
}

interface ProjectFormProps{
  mode: "create" | "edit";
  initialData?: any;
  projectId?: string;
}
const STEPS = [
  { id: 'project-details', name: 'PROJECT DETAILS', component: <NewProj /> },
  { id: 'contact-details', name: 'CONTACT DETAILS', component: <ContactDetails /> },
  { id: 'focus-area', name: 'FOCUS AREA', component: <FocusAreas /> },
  { id: 'funding', name: 'FUNDING', component: <Funding /> },
];

const SideNavigation = ({ currentStep, setCurrentStep }) => (
  <div className="hidden w-64 p-6 space-y-2 md:block">
    {STEPS.map((step) => (
      <button
        key={step.id}
        onClick={() => setCurrentStep(step.id)}
        className={`w-full text-left px-4 py-3 transition-colors ${
          currentStep === step.id
            ? 'bg-green-0 text-gray-700 font-medium border-green-0 rounded-md '
            : 'text-gray-600 hover:bg-green-0'
        }`}
      >
        {step.name}
      </button>
    ))}
  </div>
);

 const initialForm = {
  name: '',
    description: '',
    logo: null,
    contact_first_name: '',
    contact_last_name: '',
    website: '',
    country_id: null,
    state_id: null,
    city: '',
    leadership_demographics_other: '',
    recipient_legal_status: '',
    leadership_demographics: [],
}
const ProjectForm = ({ mode, initialData, projectId }: ProjectFormProps) => {

  // const { updateDraft, clearDraft} = useAppSelector((state) => state['/projectForm']);
  // const dispatch = useAppDispatch;
  // const dispatch = useDispatch();
  // const projectForm = useSelector((state: RootState) => state.projectForm)

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(STEPS[0].id);

  const handleSubmit = (values: FormValues) => {
    // if(initialValues?.partnerName){
    //   console.log(values)
    // }else{
    //   console.log('create form');
    // };
  };
  return (
    <Form onSubmit={handleSubmit} initialValues={initialData || {partnerName: '',
      projectWebsite: '',
      projectDescription: '',
      logo: '',
      collectDemographics: 'no',
      leadershipDemographics: [],
      contactName: '',
      email: '',
      focusArea: '',
      fundingAmount: '',
    }}
    validate={(values) => {
      const errors: any = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.description) {
        errors.description = 'Description is required';
      }
      
      return errors;
    }}
    render={({handleSubmit, values, valid, submitting, form}) => (
      <form onSubmit={handleSubmit} className='flex flex-col gap-8 p-4 md:flex-row'>
        <SideNavigation currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <div className='flex-1 max-w-3xl'>
          {STEPS.find(step => step.id === currentStep)?.component}
        </div>
      </form>
    )}
    />
  );
};

export default ProjectForm;
