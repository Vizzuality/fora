# This file was generated with rails g enum FundingType

class FundingType
  include EnumModel

  TYPES = %w[
    general_operating_support
    program_or_project_specific
    media_and_communications
    sponsorship
  ].freeze
end
