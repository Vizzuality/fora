import { CapitalType } from '@/types/api/capital-type';
import { Demographic } from '@/types/api/demographic';
import { FundingType } from '@/types/api/funding-type';
import { DurationGranInvestment } from '@/types/api/grant-duration';
import { Privacy } from '@/types/api/privacy';
import { Project } from '@/types/api/project';

export interface Investment {
  id: string;
  amount: string;
  year_invested: number;
  initial_funded_year: number;
  funding_type: FundingType;
  funding_type_other: string;
  areas: string[];
  areas_other: string;
  grant_duration: DurationGranInvestment;
  number_of_grant_years: number;
  demographics: Demographic[];
  demographics_other: string | undefined;
  capital_type: CapitalType;
  capital_type_other: string | undefined;
  submitting_organization_contact_name: string | undefined;
  privacy: Privacy;
  updated_at: string;
  created_at: string;
  project: Project;
  subgeographic_ancestors: {
    type: 'subgeographic';
    id: string;
  }[];
  subgeographics: {
    type: 'subgeographic';
    id: string;
  }[];
}

export type InifiniteInvestments = {
  data: Investment[];
  meta: {
    page: number;
    pages: number;
    total: number;
    to: number;
  };
};
