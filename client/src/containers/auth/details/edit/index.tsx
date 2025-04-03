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
import { SubGeographic } from '@/types/api/geographics';

export default function EditFunder() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: funder } = useQuery({
    ...myDetailsQueryOptions(session, {
      includes: 'subgeographics',
    }),
  });

  const { data: subgeographics } = useQuery({
    queryKey: ['subgeographics'],
    queryFn: () =>
      API.request<SubGeographic[]>({
        method: 'GET',
        url: '/subgeographics',
      }).then((response) => response.data),
  });

  const mutation = useMutation({
    mutationKey: ['editFunder', session?.accessToken],
    mutationFn: (data: FunderSchema) => {
      delete data.internal_networks;

      return API.request<{ data: Funder }>({
        method: 'PUT',
        url: '/members/funder',
        data: {
          ...data,
          //@todo review this
          // countries and states are merged into a single array
          subgeographic_ids: [...data.countries, ...data.states],
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
          queryKey: ['funder', response.data.data.id],
        })
        .then(() => {
          queryClient.setQueryData(['funder', session.accessToken], response.data);
        });
      await fetch(`/api/revalidate/funders?id=${response.data.data.id}`);
    },
  });

  const funderSubgeographicsIds = funder.subgeographics?.map(({ id: subgeoId }) => subgeoId);

  const countriesIds =
    subgeographics
      ?.filter(
        ({ id: subgeoId, geographic }) =>
          funderSubgeographicsIds.includes(subgeoId) && geographic === 'countries',
      )
      .map(({ id: countryId }) => countryId) || [];

  const statesIds =
    subgeographics
      ?.filter(
        ({ id: subgeoId, geographic }) =>
          funderSubgeographicsIds.includes(subgeoId) && geographic === 'states',
      )
      .map(({ id: countryId }) => countryId) || [];

  return (
    <Wrapper className="flex h-full w-full grow">
      <FormWrapper<{ imageURL: string }>
        initialValues={{
          name: funder.name ?? undefined,
          date_joined_fora: funder.date_joined_fora ?? undefined,
          primary_office_country_id: funder.primary_office_country.id ?? undefined,
          primary_office_state_id: funder.primary_office_state?.id ?? undefined,
          primary_office_city: funder.primary_office_city,
          primary_office_address: funder.primary_office_address ?? undefined,
          website: funder.website ?? undefined,
          funder_type: funder.funder_type ?? undefined,
          funder_type_other: funder.funder_type_other ?? undefined,
          funder_legal_status: funder.funder_legal_status ?? undefined,
          funder_legal_status_other: funder.funder_legal_status_other ?? undefined,
          description: funder.description ?? undefined,
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
          number_staff_employees: funder.number_staff_employees ?? undefined,
          application_status: funder.application_status ?? undefined,
          capital_acceptances: funder.capital_acceptances ?? undefined,
          capital_acceptances_other: funder.capital_acceptances_other ?? undefined,
          leadership_demographics: funder.leadership_demographics ?? undefined,
          leadership_demographics_other: funder.leadership_demographics_other ?? undefined,
          new_to_regenerative_ag: funder.new_to_regenerative_ag ? 'yes' : 'no',
          areas: funder.areas ?? undefined,
          areas_other: funder.areas_other ?? undefined,
          demographics: funder.demographics ?? undefined,
          demographics_other: funder.demographics_other ?? undefined,
          countries: countriesIds,
          states: statesIds,
          internal_networks: funder.networks ? 'yes' : 'no',
          networks: funder.networks ?? undefined,
          capital_types: funder.capital_types ?? undefined,
          capital_types_other: funder.capital_types_other ?? undefined,
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
