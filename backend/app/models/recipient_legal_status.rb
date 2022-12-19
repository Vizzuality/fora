# This file was generated with rails g enum RecipientLegalStatus

class RecipientLegalStatus
  include EnumModel

  TYPES = %w[
    for_profit
    government_organization
    individual
    non_profit
    research_institution
    i_dont_know
  ].freeze
end
