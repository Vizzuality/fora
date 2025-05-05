import { useForm, useFormState } from 'react-final-form';

import { useParams, useSearchParams } from 'next/navigation';

import { useSetAtom } from 'jotai/react';
import { LuCircleHelp } from 'react-icons/lu';

import { FORM_STEPS } from '@/containers/auth/projects/constants';
import { formModalAtom } from '@/containers/auth/store';
import { useProject } from '@/hooks/projects';
import { Button, LinkButton } from 'components/button/component';

export default function EditProjectHeader() {
  const { invalid } = useFormState();
  const { submit } = useForm();
  const { id } = useParams<{ id: string }>();

  const queryParams = useSearchParams();
  const currentStep = queryParams.get('step') as (typeof FORM_STEPS)[number]['value'];
  const setFormModal = useSetAtom(formModalAtom);

  const { data: project } = useProject(id);

  return (
    <header className="grid grid-cols-12 items-center justify-between">
      <h2 className="col-span-9 truncate font-display text-3xl" title={project?.name}>
        {project?.name}
      </h2>
      <div className="col-span-3 flex justify-end gap-4">
        {currentStep === 'investments' && (
          <LinkButton theme="outline" size="xs" href={`/projects/${project?.id}`}>
            Project Page
          </LinkButton>
        )}
        {currentStep !== 'investments' && (
          <div className="col-span-2 flex items-center justify-end gap-4">
            <Button
              type="submit"
              theme="green"
              disabled={invalid}
              onClick={submit}
              className="shrink-0"
            >
              Save changes
            </Button>

            <button
              type="button"
              className="flex items-center gap-2 font-semibold text-grey-0"
              onClick={() => {
                setFormModal(true);
              }}
            >
              <LuCircleHelp className="h-5 w-5" />
              <span>Help</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
