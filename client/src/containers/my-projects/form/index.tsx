import { FormRenderProps } from 'react-final-form';

import { useSearchParams } from 'next/navigation';

import ContactDetailsStep from './steps/contact-details';
import FundingStep from './steps/funding';
import ProjectDetailsStep from './steps/project-details';

type STEP = 'project-details' | 'contact-details' | 'funding';

export default function Form({ handleSubmit }: { handleSubmit: FormRenderProps['handleSubmit'] }) {
  const searchParams = useSearchParams();
  const currentStep = (searchParams.get('step') as STEP) || 'project-details';

  return (
    <form onSubmit={handleSubmit}>
      {currentStep === 'project-details' && <ProjectDetailsStep />}
      {currentStep === 'contact-details' && <ContactDetailsStep />}
      {currentStep === 'funding' && <FundingStep />}
    </form>
  );
}
