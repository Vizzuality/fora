# This file was generated with rails g enum WidgetSlug

class WidgetSlug
  include EnumModel

  TYPES_WITH_QUERIES = {
    "summary" => Widgets::Queries::Summary,
    "funded_areas" => Widgets::Queries::FundedAreas,
    "funded_subgeographics" => nil,
    "funded_demographics" => nil,
    "funded_funder_types" => nil,
    "funded_capital_types" => nil,
    "funded_funder_legal_statuses" => nil,
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
