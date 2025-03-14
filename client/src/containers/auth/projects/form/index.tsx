import { FormRenderProps } from 'react-final-form';

import { useSearchParams } from 'next/navigation';

import { FORM_STEPS } from '../constants';
import InvestmentsStep from '../investments';

import ContactDetailsStep from './steps/contact-details';
import ProjectDetailsStep from './steps/project-details';

export default function Form({ handleSubmit }: { handleSubmit: FormRenderProps['handleSubmit'] }) {
  const searchParams = useSearchParams();
  const currentStep =
    (searchParams.get('step') as typeof FORM_STEPS[number]['value']) || FORM_STEPS[0].value;

  return (
    <>
      {['project-details', 'contact-details'].includes(currentStep) && (
        <form onSubmit={handleSubmit}>
          {currentStep === 'project-details' && <ProjectDetailsStep />}
          {currentStep === 'contact-details' && <ContactDetailsStep />}
        </form>
      )}
      {currentStep === 'investments' && <InvestmentsStep />}
    </>
  );
}
