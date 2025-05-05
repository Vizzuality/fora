import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import Form from '@/containers/auth/investments/form';
import { InvestmentSchema } from '@/containers/auth/investments/form/validations';
import FormWrapper from '@/containers/auth/investments/form/wrapper';
import Wrapper from '@/containers/wrapper';
import { useToast } from '@/hooks/use-toast';
import API from '@/services/api';
import { SubGeographic } from '@/types/api/geographics';
import { Investment } from '@/types/api/investment';

const EMPTY_ARRAY = [];

export default function EditInvestment() {
  const { data: session } = useSession();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: investment } = useQuery({
    queryKey: ['investments', id],
    queryFn: () =>
      API.request<Investment>({
        method: 'GET',
        url: `/members/investments/${id}`,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }).then((response) => response.data),
    placeholderData: keepPreviousData,
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
      toast({
        description: 'Investment updated successfully.',
      });
    },
  });

  const investmentSubgeographicsIds = useMemo(
    () => investment.subgeographics.map(({ id: subgeoId }) => subgeoId) || EMPTY_ARRAY,
    [investment],
  );
  const countriesIds = useMemo(
    () =>
      subgeographics
        ?.filter(
          ({ id: subgeoId, geographic }) =>
            investmentSubgeographicsIds.includes(subgeoId) && geographic === 'countries',
        )
        .map(({ id: countryId }) => countryId) || EMPTY_ARRAY,
    [subgeographics, investmentSubgeographicsIds],
  );

  const statesIds = useMemo(
    () =>
      subgeographics
        ?.filter(
          ({ id: subgeoId, geographic }) =>
            investmentSubgeographicsIds.includes(subgeoId) && geographic === 'states',
        )
        .map(({ id: countryId }) => countryId) || EMPTY_ARRAY,
    [subgeographics, investmentSubgeographicsIds],
  );

  return (
    <Wrapper className="flex w-full grow">
      <FormWrapper
        initialValues={{
          project_id: investment.project.id ?? undefined,
          privacy: investment.privacy ?? undefined,
          amount: Number(investment.amount) ?? undefined,
          year_invested: Number(investment.year_invested) ?? undefined,
          initial_funded_year: Number(investment.initial_funded_year) ?? undefined,
          grant_duration: investment.grant_duration ?? undefined,
          number_of_grant_years: investment.number_of_grant_years ?? undefined,
          capital_type: investment.capital_type ?? undefined,
          capital_type_other: investment.capital_type_other ?? undefined,
          funding_type: investment.funding_type ?? undefined,
          funding_type_other: investment.funding_type_other ?? undefined,
          countries: countriesIds,
          states: statesIds,
          areas: investment.areas ?? undefined,
          areas_other: investment.areas_other ?? undefined,
          internal_demographics_collection: investment.demographics?.length > 0 ? 'yes' : 'no',
          demographics: investment.demographics ?? undefined,
          demographics_other: investment.demographics_other ?? undefined,
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
