import { useForm, useFormState } from 'react-final-form';

import { useParams, useSearchParams } from 'next/navigation';

import { FORM_STEPS } from '@/containers/auth/projects/constants';
import { useProject } from '@/hooks/projects';
import { Button, LinkButton } from 'components/button/component';

export default function EditProjectHeader() {
  const { invalid } = useFormState();
  const { submit } = useForm();
  const { id } = useParams<{ id: string }>();

  const queryParams = useSearchParams();
  const currentStep = queryParams.get('step') as (typeof FORM_STEPS)[number]['value'];

  const { data: project } = useProject(id);

  return (
    <header className="grid grid-cols-12 items-center justify-between">
      <h2 className="col-span-10 truncate font-display text-3xl" title={project?.name}>
        {project?.name}
      </h2>
      <div className="col-span-2 flex justify-end gap-4">
        {currentStep === 'investments' && (
          <LinkButton theme="outline" size="xs" href={`/projects/${project?.id}`}>
            Project Page
          </LinkButton>
        )}
        {currentStep !== 'investments' && (
          <Button type="submit" theme="green" disabled={invalid} onClick={submit}>
            Save changes
          </Button>
        )}
      </div>
    </header>
  );
}
