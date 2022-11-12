# This file was generated with rails g enum WidgetSlug

class WidgetSlug
  include EnumModel

  TYPES_WITH_QUERIES = {
    "summary" => Widgets::Queries::Summary,
    "funded_areas" => Widgets::Queries::FundedAreas,
    "funded_subgeographics" => Widgets::Queries::FundedSubgeographics,
    "funded_demographics" => Widgets::Queries::FundedDemographics,
    "funded_funder_types" => Widgets::Queries::FundedFunderTypes,
    "funded_capital_types" => Widgets::Queries::FundedCapitalTypes,
    "funded_recipient_legal_statuses" => Widgets::Queries::FundedRecipientLegalStatuses,
    "total_projects_funders_areas" => nil,
    "total_projects_funders_subgeographics" => nil,
    "total_projects_capital_types" => nil,
    "total_projects_demographics" => nil,
    "total_funders_capital_types" => nil,
    "total_funders_demographics" => nil,
    "total_funders_funder_types" => nil,
    "total_funders_capital_acceptances" => nil,
    "total_projects_recipient_legal_statuses" => nil
  }.freeze
  TYPES = TYPES_WITH_QUERIES.keys

  def read_attribute(_name)
    id
  end
end
