import { SubGeographic } from 'hooks/geographics/types';

export interface Funder {
  id: string;
  name: string;
  description: string;
  subgeographic_ancestors: SubGeographic[];
}

export interface FundersResponseData {
  data: Funder[];
}

export interface FunderResponseData {
  data: Funder;
}
