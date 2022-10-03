# This file was generated with rails g enum FunderLegalStatus

class FunderLegalStatus
  include EnumModel

  TYPES = %w[
    for_profit
    government_organization
    individual
    non_profit
    research_institution
    other
  ].freeze
end
