# This file was generated with rails g enum RecipientLegalStatus

class RecipientLegalStatus
  include EnumModel

  TYPES = %w[
    for_profit
    foundation
    cooperative
    other
  ].freeze
end
