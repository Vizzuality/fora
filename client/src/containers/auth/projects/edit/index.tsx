import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import EditProjectHeader from '@/containers/auth/projects/edit/header';
import Form from '@/containers/auth/projects/form';
import FormWrapper from '@/containers/auth/projects/form/wrapper';
import MyProjectsSidebar from '@/containers/auth/projects/sidebar';
import Wrapper from '@/containers/wrapper';
import { useMe } from '@/hooks/members';
import { useProject } from '@/hooks/projects';
import API from '@/services/api';
import { Project } from '@/types/project';

import { FORM_STEPS } from '../constants';

export default function EditProject() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: me } = useMe();
  const queryClient = useQueryClient();

  const { data: project } = useProject(id);

  const mutation = useMutation({
    mutationKey: ['editProject', id],
    mutationFn: (data: FormData) => {
      return API.request<{ data: Project }>({
        method: 'PUT',
        url: `/members/projects/${id}`,
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
    },
    onSuccess: async (response) => {
      await queryClient
        .invalidateQueries({
          queryKey: ['project', id],
        })
        .then(() => {
          queryClient.setQueryData(['project', id], response.data);
        });
      await fetch(`/api/revalidate/projects?id=${id}`);
      push(`/projects/${id}`);
    },
  });

  return (
    <Wrapper className="flex h-full w-full grow">
      <FormWrapper<{ imageURL: string }>
        initialValues={{
          name: project.name,
          description: project.description,
          website: project.website ?? undefined,
          imageURL: project.logo ? project.logo.original : undefined,
          city: project.city,
          country_id: project.country.id,
          state_id: project.state ? project.state.id : undefined,
          recipient_legal_status: project.recipient_legal_status,
          internal_leadership_demographics_collection:
            project.leadership_demographics?.length > 0 ? 'yes' : 'no',
          leadership_demographics: project.leadership_demographics ?? [],
          leadership_demographics_other: project.leadership_demographics_other ?? undefined,
        }}
        onSubmit={(data) => {
          const formData = new FormData();
          delete data.internal_leadership_demographics_collection;

          const strippedData: typeof data = JSON.parse(JSON.stringify(data));

          for (const key in strippedData) {
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
              <EditProjectHeader />
              <div className="grid h-full grid-cols-12 gap-16 overflow-hidden">
                <div className="col-span-3">
                  <MyProjectsSidebar sections={FORM_STEPS.map((l) => l)} />
                </div>
                <div className="col-span-9 flex h-full overflow-hidden">
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
