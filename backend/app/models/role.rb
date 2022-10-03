# This file was generated with rails g enum Role

class Role
  include EnumModel

  TYPES = %w[
    funder
    regrantor
    intermediary
  ].freeze
end
