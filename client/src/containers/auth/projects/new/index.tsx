import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { useMe } from 'hooks/members';

import Wrapper from 'containers/wrapper';

import API from 'services/api';

import { FORM_STEPS } from '../constants';
import Form from '../form';
import FormWrapper from '../form/wrapper';
import MyProjectsSidebar from '../sidebar';

import NewProjectHeader from './header';

export const NEW_PROJECT_QUERY_KEY = ['newProject'];

export default function NewProject() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const { data: me } = useMe();

  const mutation = useMutation({
    mutationKey: NEW_PROJECT_QUERY_KEY,
    mutationFn: (data: FormData) => {
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
      push('/auth/projects/new?step=investments');
    },
  });

  const formSteps = useMemo(() => {
    return FORM_STEPS.map((step, index) => {
      if (index === 2) {
        return { ...step, disabled: mutation.isPending || mutation.isIdle };
      }
      return { ...step, disabled: mutation.isSuccess };
    });
  }, [mutation]);

  return (
    <Wrapper className="flex w-full grow">
      <FormWrapper
        initialValues={{
          internal_leadership_demographics_collection: 'yes',
        }}
        onSubmit={(data) => {
          const formData = new FormData();

          delete data.internal_leadership_demographics_collection;

          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const value = data[key];

              if (Array.isArray(value)) {
                value.forEach((v) => {
                  formData.append(`${key}[]`, v);
                });
              } else {
                formData.append(key, value);
              }
            }
          }

          formData.append('contact_first_name', me?.name.split(' ')[0]);
          formData.append('contact_last_name', me?.name.split(' ')[1]);

          mutation.mutate(formData);
        }}
        render={({ handleSubmit }) => {
          return (
            <div className="flex grow flex-col gap-14">
              <NewProjectHeader />
              <div className="grid h-full grid-cols-12 gap-16">
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
