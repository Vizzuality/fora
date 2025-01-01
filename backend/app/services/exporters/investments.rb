module Exporters
  class Investments < Base
    def initialize(query)
      super query, include_associations: [:funder, project: [:recipient]]
    end

    def call
      generate_csv do
        column(I18n.t("activerecord.attributes.investment.id")) { |r| r.id }
        column(I18n.t("activerecord.attributes.investment.funder")) { |r| r.funder&.name }
        column(I18n.t("activerecord.attributes.investment.project")) { |r| r.project&.recipient&.name }
        column(I18n.t("activerecord.attributes.investment.amount")) { |r| r.amount }
        column(I18n.t("activerecord.attributes.investment.year_invested")) { |r| r.year_invested }
        column(I18n.t("activerecord.attributes.investment.initial_funded_year")) { |r| r.initial_funded_year }
        column(I18n.t("activerecord.attributes.investment.funding_type")) do |r|
          FundingType.find(r.funding_type)&.name
        end
        column(I18n.t("activerecord.attributes.investment.funding_type_other")) { |r| r.funding_type_other }
        column(I18n.t("activerecord.attributes.investment.areas")) do |r|
          Area.find_many(r.areas).map(&:name).join(", ")
        end
        column(I18n.t("activerecord.attributes.investment.areas_other")) { |r| r.areas_other }
        column(I18n.t("activerecord.attributes.investment.grant_duration")) do |r|
          GrantDuration.find(r.grant_duration)&.name
        end
        column(I18n.t("activerecord.attributes.investment.number_of_grant_years")) { |r| r.number_of_grant_years }
        column(I18n.t("activerecord.attributes.investment.demographics")) do |r|
          Demographic.find_many(r.demographics).map(&:name).join(", ")
        end
        column(I18n.t("activerecord.attributes.investment.demographics_other")) { |r| r.demographics_other }
        column(I18n.t("activerecord.attributes.investment.capital_type")) do |r|
          CapitalType.find(r.capital_type)&.name
        end
        column(I18n.t("activerecord.attributes.investment.capital_type_other")) { |r| r.capital_type_other }
        column(I18n.t("activerecord.attributes.investment.submitting_organization_contact_name")) do |r|
          r.submitting_organization_contact_name
        end
        column(I18n.t("activerecord.attributes.investment.privacy")) do |r|
          InvestmentPrivacy.find(r.privacy)&.name
        end
        column(I18n.t("activerecord.attributes.investment.created_at")) { |r| I18n.l r.created_at }
        column(I18n.t("activerecord.attributes.investment.updated_at")) { |r| I18n.l r.updated_at }
      end
    end
  end
end
