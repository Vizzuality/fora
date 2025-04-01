import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import Form from '@/containers/auth/investments/form';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';
import FormWrapper from '@/containers/auth/investments/form/wrapper';
import Wrapper from '@/containers/wrapper';
import API from '@/services/api';
import { Privacy } from '@/types/api/privacy';

export default function NewInvestment() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const selectedProject = searchParams.get('project');

  const mutation = useMutation({
    mutationKey: ['new-investment'],
    mutationFn: (data: InvestmentSchema & { subgeographic_ids: string[] }) => {
      return API.request({
        method: 'POST',
        url: '/members/investments',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
    },
    onSuccess: () => {
      push('/auth/investments');
    },
  });

  return (
    <Wrapper className="flex w-full grow">
      <FormWrapper
        onSubmit={(data) => {
          delete data.internal_demographics_collection;

          mutation.mutate({
            ...data,
            // countries and states are merged into a single array
            subgeographic_ids: [...data.countries, ...data.states],
          });
        }}
        keepDirtyOnReinitialize
        initialValues={{
          privacy: Privacy.All,
          countries: [],
          states: [],
          areas: [],
          demographics: [],
          internal_demographics_collection: 'yes',
          project_id: selectedProject ?? '',
        }}
        render={({ handleSubmit }) => <Form handleSubmit={handleSubmit} />}
      />
    </Wrapper>
  );
}
