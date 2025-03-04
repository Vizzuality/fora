import { useForm, useFormState } from 'react-final-form';

import { useSearchParams } from 'next/navigation';

import { useIsMutating } from '@tanstack/react-query';

import { Button, LinkButton } from 'components/button/component';

import { FORM_STEPS } from '../constants';

import { NEW_PROJECT_QUERY_KEY } from './index';

export default function NewProjectHeader() {
  const { invalid } = useFormState();
  const { submit } = useForm();
  const queryParams = useSearchParams();
  const currentStep = queryParams.get('step') as typeof FORM_STEPS[number]['value'];

  const isMutatingNewProject = useIsMutating({ mutationKey: NEW_PROJECT_QUERY_KEY });

  return (
    <header className="flex justify-between items-center">
      <h2 className="text-3xl font-display">New project</h2>
      <div className="flex gap-4">
        {currentStep === 'funding' && !isMutatingNewProject && (
          <LinkButton theme="outline" size="xs" href="/projects/{projectId}">
            Project Page
          </LinkButton>
        )}
        {currentStep !== 'funding' && (
          <Button
            type="submit"
            theme="green"
            disabled={invalid || isMutatingNewProject > 0}
            onClick={submit}
          >
            Save changes
          </Button>
        )}
      </div>
    </header>
  );
}
