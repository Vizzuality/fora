export interface CapitalAcceptance {
  id: string;
  name: string;
}

export enum CapitalAcceptances {
  AdvisesManagesCapital = 'advises_and_manages_capital',
  DoesNotProvideFunding = 'does_not_provide_funding',
  DonationsAccepted = 'donations_accepted',
  InvestmentsAccepted = 'investments_accepted',
  PrivateCapital = 'private_capital',
  Other = 'other',
}
