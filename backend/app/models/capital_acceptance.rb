# This file was generated with rails g enum CapitalAcceptance

class CapitalAcceptance
  include EnumModel

  TYPES = %w[
    advises_and_manages_capital
    does_not_provide_funding
    donations_accepted
    investments_accepted
    private_capital
    other
  ].freeze
end
