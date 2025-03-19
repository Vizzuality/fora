export enum PrivacyEnum {
  All = 'all',
  AggregateAmountFunded = 'aggregate_amount_funded',
  AmountFundedVisibleOnlyToMembers = 'amount_funded_visible_only_to_members',
  AmountFundedVisibleOnlyToStaff = 'amount_funded_visible_only_to_staff',
  VisibleOnlyToMembers = 'visible_only_to_members',
  VisibleOnlyToStaff = 'visible_only_to_staff',
}

export enum CapitalTypeEnum {
  Grants = 'grants',
  Debt = 'debt',
  Equity = 'equity',
  Pris = 'pris',
  Mris = 'mris',
  ReGrants = 're_grants',
  ForgivableLoans = 'forgivable_loans',
  Guarantees = 'guarantees',
  Other = 'other',
}

export enum FundingTypeEnum {
  GeneralOperatingSupport = 'general_operating_support',
  ProgramOrProjectSpecific = 'program_or_project_specific',
  MediaAndCommunications = 'media_and_communications',
  Sponsorship = 'sponsorship',
  Other = 'other',
}

export enum DurationGranInvestment {
  OneYear = 'one_year',
  MultiYear = 'multi_year',
  Other = 'other',
}
