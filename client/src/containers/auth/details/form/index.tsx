import { FormRenderProps, useForm } from 'react-final-form';

import { useSearchParams } from 'next/navigation';

import { FORM_STEPS } from '@/containers/auth/details/constants';
import CapitalStrategyStep from '@/containers/auth/details/form/steps/capital-strategy';
import ProjectDetailsStep from '@/containers/auth/details/form/steps/contact-details';
import FocusCollaborationStep from '@/containers/auth/details/form/steps/focus-collaboration';
import FunderDetailsStep from '@/containers/auth/details/form/steps/funder-details';
import OperationsStaffStep from '@/containers/auth/details/form/steps/operations-staff';
import { FunderSchema } from '@/containers/auth/details/form/validations';

export const useFunderForm = () => useForm<FunderSchema & { imageURL: string }>();

export default function Form({ handleSubmit }: { handleSubmit: FormRenderProps['handleSubmit'] }) {
  const searchParams = useSearchParams();
  const currentStep =
    (searchParams.get('step') as (typeof FORM_STEPS)[number]['value']) || FORM_STEPS[0].value;

  return (
    <form onSubmit={handleSubmit}>
      {currentStep === 'funder-details' && <FunderDetailsStep />}
      {currentStep === 'contact-details' && <ProjectDetailsStep />}
      {currentStep === 'operations-staff' && <OperationsStaffStep />}
      {currentStep === 'focus-collaboration' && <FocusCollaborationStep />}
      {currentStep === 'capital-strategy' && <CapitalStrategyStep />}
    </form>
  );
}
