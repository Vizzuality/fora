# This file was generated with rails g enum Privacy

class InvestmentPrivacy
  include EnumModel

  TYPES = %w[
    all
    aggregate_amount_funded
    amount_funded_visible_only_to_members
    amount_funded_visible_only_to_staff
    visible_only_to_members
    visible_only_to_staff
  ].freeze
end
