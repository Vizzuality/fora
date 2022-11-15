# This file was generated with rails g enum ReportYear

class ReportYear
  include EnumModel

  # Recreate Widgets when adding new year by specialized task
  TYPES = [
    2021
  ].freeze

  def read_attribute(_name)
    id
  end
end
