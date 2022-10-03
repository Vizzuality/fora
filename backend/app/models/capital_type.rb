# This file was generated with rails g enum CapitalType

class CapitalType
  include EnumModel

  TYPES = %w[
    grants
    debt
    equity
    pris
    mris
    re_grants
    forgivable_loans
    guarantees
  ].freeze
end
