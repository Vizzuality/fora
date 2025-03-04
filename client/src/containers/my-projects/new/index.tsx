import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import Wrapper from 'containers/wrapper';

import API from 'services/api';

import { FORM_STEPS } from '../constants';
import Form from '../form';
import { ProjectSchema } from '../form/validations';
import FormWrapper from '../form/wrapper';
import MyProjectsSidebar from '../sidebar';

import NewProjectHeader from './header';

export const NEW_PROJECT_QUERY_KEY = ['newProject'];

export default function NewProject() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const mutation = useMutation({
    mutationKey: NEW_PROJECT_QUERY_KEY,
    mutationFn: (data: ProjectSchema) => {
      return API.request({
        method: 'POST',
        url: '/members/projects',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
    },
    onSuccess: () => {
      push('/my-projects/new?step=funding');
    },
  });

  const formSteps = useMemo(() => {
    return FORM_STEPS.map((step, index) => {
      if (index === 2) {
        return { ...step, disabled: mutation.isLoading || mutation.isIdle };
      }
      return step;
    });
  }, [mutation]);

  return (
    <Wrapper className="w-full flex grow">
      <FormWrapper
        onSubmit={(data) => {
          mutation.mutate(data);
        }}
        render={({ handleSubmit }) => {
          return (
            <div className="flex flex-col gap-14 grow">
              <NewProjectHeader />
              <div className="grid grid-cols-12 gap-16 h-full">
                <div className="col-span-3">
                  <MyProjectsSidebar sections={formSteps} />
                </div>
                <div className="col-span-9 flex">
                  <Form handleSubmit={handleSubmit} />
                </div>
              </div>
            </div>
          );
        }}
      />
    </Wrapper>
  );
}
