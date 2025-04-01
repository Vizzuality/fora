import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import Form from '@/containers/auth/investments/form';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';
import FormWrapper from '@/containers/auth/investments/form/wrapper';
import Wrapper from '@/containers/wrapper';
import API from '@/services/api';
import { SubGeographic } from '@/types/api/geographics';
import { Investment } from '@/types/api/investment';

export default function EditInvestment({ investment }: { investment: Investment }) {
  const { data: session } = useSession();
  const { push } = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: subgeographics } = useQuery({
    queryKey: ['subgeographics'],
    queryFn: () =>
      API.request<SubGeographic[]>({
        method: 'GET',
        url: '/subgeographics',
      }).then((response) => response.data),
  });

  const mutation = useMutation({
    mutationKey: ['editInvestment', id],
    mutationFn: (data: InvestmentSchema & { subgeographic_ids: string[] }) => {
      return API.request<{ data: Investment }>({
        method: 'PUT',
        url: `/members/investments/${id}`,
        data: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
    },
    onSuccess: async () => {
      push(`/auth/investments`);
    },
  });

  const investmentSubgeographicsIds = investment.subgeographics.map(({ id: subgeoId }) => subgeoId);
  const countriesIds =
    subgeographics
      ?.filter(
        ({ id: subgeoId, geographic }) =>
          investmentSubgeographicsIds.includes(subgeoId) && geographic === 'countries',
      )
      .map(({ id: countryId }) => countryId) || [];

  const statesIds =
    subgeographics
      ?.filter(
        ({ id: subgeoId, geographic }) =>
          investmentSubgeographicsIds.includes(subgeoId) && geographic === 'states',
      )
      .map(({ id: countryId }) => countryId) || [];

  return (
    <Wrapper className="flex w-full grow">
      <FormWrapper
        initialValues={{
          project_id: investment.project.id,
          privacy: investment.privacy,
          amount: Number(investment.amount),
          year_invested: Number(investment.year_invested),
          initial_funded_year: Number(investment.initial_funded_year),
          grant_duration: investment.grant_duration,
          number_of_grant_years: investment.number_of_grant_years ?? undefined,
          capital_type: investment.capital_type,
          capital_type_other: investment.capital_type_other ?? '',
          funding_type: investment.funding_type ?? undefined,
          funding_type_other: investment.funding_type_other ?? '',
          countries: countriesIds,
          states: statesIds,
          areas: investment.areas,
          areas_other: investment.areas_other ?? '',
          internal_demographics_collection: investment.demographics?.length > 0 ? 'yes' : 'no',
          demographics: investment.demographics,
          demographics_other: investment.demographics_other ?? '',
        }}
        onSubmit={(data) => {
          delete data.internal_demographics_collection;

          mutation.mutate({
            ...data,
            // countries and states are merged into a single array
            subgeographic_ids: [...data.countries, ...data.states],
          });
        }}
        render={({ handleSubmit }) => {
          return <Form handleSubmit={handleSubmit} />;
        }}
      />
    </Wrapper>
  );
}
