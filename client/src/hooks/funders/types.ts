export interface Funder {
  id: string;
  name: string;
  description: string;
}

export interface FundersResponseData {
  data: Funder[];
}

export interface FunderResponseData {
  data: Funder;
}
