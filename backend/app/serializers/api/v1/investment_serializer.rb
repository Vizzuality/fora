module API
  module V1
    class InvestmentSerializer < BaseSerializer
      attributes :amount,
        :year_invested,
        :initial_funded_year,
        :funding_type,
        :funding_type_other,
        :areas,
        :areas_other,
        :grant_duration,
        :number_of_grant_years,
        :demographics,
        :demographics_other,
        :capital_type,
        :capital_type_other,
        :submitting_organization_contact_name,
        :privacy,
        :updated_at,
        :created_at

      belongs_to_restricted :project
      belongs_to_restricted :funder

      has_many_restricted :subgeographics
      has_many_restricted :subgeographic_ancestors, serializer: :subgeographic
    end
  end
end
