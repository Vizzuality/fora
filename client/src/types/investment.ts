import {
  CapitalTypeEnum,
  DurationGranInvestment,
  FundingTypeEnum,
  PrivacyEnum,
} from '@/containers/auth/investments/form/types';

export interface Investment {
  id: string;
  amount: string;
  year_invested: number;
  initial_funded_year: number;
  funding_type: FundingTypeEnum;
  funding_type_other: string;
  areas: string[];
  areas_other: string;
  grant_duration: DurationGranInvestment;
  number_of_grant_years: number;
  demographics: string[];
  demographics_other: string;
  capital_type: CapitalTypeEnum;
  capital_type_other: string;
  submitting_organization_contact_name: string;
  privacy: PrivacyEnum;
  updated_at: string;
  created_at: string;
  project: {
    type: 'project';
    id: string;
  };
  subgeographic_ancestors: {
    type: 'subgeographic';
    id: string;
  }[];
  subgeographics: {
    type: 'subgeographic';
    id: string;
  }[];
  // funder: Partial<Funder>;
  // project: Partial<Project>;
}
