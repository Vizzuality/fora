# This file was generated with rails g enum Demographic

class Demographic
  include EnumModel

  TYPES = %w[
    black_or_african_american
    indigenous_tribal_nations
    women
    youth
    asian
    hispanic_or_latinx
    lgbtq
    white
    no_specific_focus
    other
    i_dont_know
  ].freeze
end
