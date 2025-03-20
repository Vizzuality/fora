import { useForm, useFormState } from 'react-final-form';

import { useSearchParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { Project } from 'types/project';

import { Button, LinkButton } from 'components/button/component';

import { FORM_STEPS } from '../constants';

import { NEW_PROJECT_QUERY_KEY } from './index';

export default function NewProjectHeader() {
  const { invalid } = useFormState();
  const { submit } = useForm();

  const queryParams = useSearchParams();
  const currentStep = queryParams.get('step') as (typeof FORM_STEPS)[number]['value'];

  const queryClient = useQueryClient();
  const mutationCache = queryClient.getMutationCache();
  const newProjectMutationState = mutationCache.find<{ data: { data: Project } }>({
    mutationKey: NEW_PROJECT_QUERY_KEY,
  })?.state;

  return (
    <header className="flex items-center justify-between">
      <h2 className="font-display text-3xl">New project</h2>
      <div className="flex gap-4">
        {currentStep === 'investments' && newProjectMutationState?.status === 'success' && (
          <LinkButton
            theme="outline"
            size="xs"
            href={`/projects/${newProjectMutationState?.data.data.data.id}`}
          >
            Project Page
          </LinkButton>
        )}
        {currentStep !== 'investments' && (
          <Button
            type="submit"
            theme="green"
            disabled={invalid || newProjectMutationState?.status === 'pending'}
            onClick={submit}
          >
            Save changes
          </Button>
        )}
      </div>
    </header>
  );
}
