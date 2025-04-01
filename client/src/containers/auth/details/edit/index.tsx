import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { FORM_STEPS } from '@/containers/auth/details/constants';
import Form from '@/containers/auth/details/form';
import { FunderSchema } from '@/containers/auth/details/form/validations';
import FormWrapper from '@/containers/auth/details/form/wrapper';
import MyDetailsHeader from '@/containers/auth/details/header';
import Sidebar from '@/containers/auth/sidebar';
import Wrapper from '@/containers/wrapper';
import { myDetailsQueryOptions } from '@/pages/auth/details';
import API from '@/services/api';
import { Funder } from '@/types/api/funder';

export default function EditFunder() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: funder } = useQuery({
    ...myDetailsQueryOptions(session),
  });

  const mutation = useMutation({
    mutationKey: ['editProject', id],
    mutationFn: (data: FunderSchema) => {
      return API.request<{ data: Funder }>({
        method: 'PUT',
        url: '/members/funder',
        data: {
          ...data,
          //@todo review this
          show_primary_email: data.show_primary_email === 'yes',
          new_to_regenerative_ag: data.new_to_regenerative_ag === 'yes',
          spend_down_strategy: data.spend_down_strategy === 'yes',
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
    },
    onSuccess: async (response) => {
      await queryClient
        .invalidateQueries({
          queryKey: ['funder', id],
        })
        .then(() => {
          queryClient.setQueryData(['funder', id], response.data);
        });
      await fetch(`/api/revalidate/funders?id=${id}`);
      push('/auth/projects');
    },
  });

  return (
    <Wrapper className="flex h-full w-full grow">
      <FormWrapper<{ imageURL: string }>
        initialValues={{
          name: funder.name,
          date_joined_fora: funder.date_joined_fora,
          primary_office_country_id: funder.primary_office_country.id,
          primary_office_state_id: funder.primary_office_state?.id ?? undefined,
          primary_office_city: funder.primary_office_city,
          primary_office_address: funder.primary_office_address,
          website: funder.website,
          funder_type: funder.funder_type,
          funder_type_other: funder.funder_type_other,
          funder_legal_status: funder.funder_legal_status,
          funder_legal_status_other: funder.funder_legal_status_other ?? undefined,
          description: funder.description,
          imageURL: funder.logo?.original ?? undefined,
          primary_contact_first_name: funder.name?.split(' ')?.[0] ?? undefined,
          primary_contact_last_name: funder.name?.split(' ')?.[1] ?? undefined,
          primary_contact_email: funder.contact_email ?? undefined,
          show_primary_email: funder.secondary_email_which_can_be_shared ? 'no' : 'yes',
          secondary_email_which_can_be_shared:
            funder.secondary_email_which_can_be_shared ?? undefined,
          primary_contact_phone: funder.primary_contact_phone ?? undefined,
          primary_contact_role: funder.primary_contact_role ?? undefined,
          primary_contact_location: funder.primary_contact_location ?? undefined,
          capital_acceptances: funder.capital_acceptances ?? undefined,
          capital_acceptances_other: funder.capital_acceptances_other ?? undefined,
          leadership_demographics: funder.leadership_demographics ?? undefined,
          leadership_demographics_other: funder.leadership_demographics_other ?? undefined,
          spend_down_strategy: funder.spend_down_strategy ? 'yes' : 'no',
        }}
        onSubmit={(data) => {
          mutation.mutate(data);
        }}
        render={({ handleSubmit }) => {
          return (
            <div className="flex grow flex-col gap-14">
              <MyDetailsHeader />
              <div className="grid h-full grid-cols-12 gap-16 overflow-hidden">
                <div className="col-span-3">
                  <Sidebar sections={FORM_STEPS.map((l) => l)} />
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
