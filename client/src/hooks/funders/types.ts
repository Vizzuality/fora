import { SubGeographic } from 'hooks/geographics/types';

export interface Funder {
  id: string;
  name: string;
  description: string;
  website: string;
  // Filters
  areas: string[];
  capital_acceptances: string[];
  capital_types: string[];
  contact_email: string;
  date_joined_fora: string;
  demographics: string[];
  funder_legal_status: string;
  funder_type: string;
  logo: {
    small: string;
    medium: string;
    original: string;
  };
  subgeographic_ancestors: SubGeographic[];
}

export interface FundersResponseData {
  data: Funder[];
}

export interface FunderResponseData {
  data: Funder;
}
