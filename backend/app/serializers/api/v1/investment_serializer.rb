module API
  module V1
    class InvestmentSerializer < BaseSerializer
      attributes :amount,
        :year_invested,
        :initial_funded_year,
        :funding_type,
        :funding_type_other,
        :capital_types,
        :areas,
        :areas_other,
        :grant_duration,
        :grant_duration_other,
        :number_of_grant_years

      belongs_to_restricted :funder
      belongs_to_restricted :project
    end
  end
end
