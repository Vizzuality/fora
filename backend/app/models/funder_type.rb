# This file was generated with rails g enum FunderType

class FunderType
  include EnumModel

  TYPES = %w[
    accelerator
    advisory
    bank
    educational_land_based
    family_office
    funder_collaborative_or_network
    individual
    initiative
    loan_fund
    private_foundation
    public_foundation
    regrantor
    other
  ].freeze
end
