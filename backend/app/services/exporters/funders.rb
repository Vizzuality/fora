module Exporters
  class Funders < Base
    def initialize(query)
      super query, include_associations: [:primary_office_country, :primary_office_state]
    end

    def call
      generate_csv do
        column(I18n.t("activerecord.attributes.funder.id")) { |r| r.id }
        column(I18n.t("activerecord.attributes.funder.name")) { |r| r.name }
        column(I18n.t("activerecord.attributes.funder.description")) { |r| r.description }
        column(I18n.t("activerecord.attributes.funder.primary_office_country")) { |r| r.primary_office_country&.name }
        column(I18n.t("activerecord.attributes.funder.primary_office_state")) { |r| r.primary_office_state&.name }
        column(I18n.t("activerecord.attributes.funder.primary_office_city")) { |r| r.primary_office_city }
        column(I18n.t("activerecord.attributes.funder.primary_office_address")) { |r| r.primary_office_address }
        column(I18n.t("activerecord.attributes.funder.primary_contact_first_name")) { |r| r.primary_contact_first_name }
        column(I18n.t("activerecord.attributes.funder.primary_contact_last_name")) { |r| r.primary_contact_last_name }
        column(I18n.t("activerecord.attributes.funder.primary_contact_email")) { |r| r.primary_contact_email }
        column(I18n.t("activerecord.attributes.funder.show_primary_email")) { |r| I18n.t r.show_primary_email }
        column(I18n.t("activerecord.attributes.funder.primary_contact_phone")) { |r| r.primary_contact_phone }
        column(I18n.t("activerecord.attributes.funder.primary_contact_location")) { |r| r.primary_contact_location }
        column(I18n.t("activerecord.attributes.funder.primary_contact_role")) { |r| r.primary_contact_role }
        column(I18n.t("activerecord.attributes.funder.secondary_email_which_can_be_shared")) { |r| r.secondary_email_which_can_be_shared }
        column(I18n.t("activerecord.attributes.funder.website")) { |r| r.website }
        column(I18n.t("activerecord.attributes.funder.date_joined_fora")) { |r| I18n.l r.date_joined_fora }
        column(I18n.t("activerecord.attributes.funder.funder_type")) { |r| FunderType.find(r.funder_type)&.name }
        column(I18n.t("activerecord.attributes.funder.funder_type_other")) { |r| r.funder_type_other }
        column(I18n.t("activerecord.attributes.funder.capital_acceptances")) do |r|
          CapitalAcceptance.find_many(r.capital_acceptances).map(&:name).join(", ")
        end
        column(I18n.t("activerecord.attributes.funder.capital_acceptances_other")) { |r| r.capital_acceptances_other }
        column(I18n.t("activerecord.attributes.funder.leadership_demographics")) do |r|
          Demographic.find_many(r.leadership_demographics).map(&:name).join(", ")
        end
        column(I18n.t("activerecord.attributes.funder.leadership_demographics_other")) { |r| r.leadership_demographics_other }
        column(I18n.t("activerecord.attributes.funder.number_staff_employees")) { |r| r.number_staff_employees }
        column(I18n.t("activerecord.attributes.funder.application_status")) do |r|
          ApplicationStatus.find(r.application_status)&.name
        end
        column(I18n.t("activerecord.attributes.funder.funder_legal_status")) do |r|
          FunderLegalStatus.find(r.funder_legal_status)&.name
        end
        column(I18n.t("activerecord.attributes.funder.funder_legal_status_other")) { |r| r.funder_legal_status_other }
        column(I18n.t("activerecord.attributes.funder.new_to_regenerative_ag")) { |r| I18n.t r.new_to_regenerative_ag }
        column(I18n.t("activerecord.attributes.funder.networks")) { |r| r.networks }
        column(I18n.t("activerecord.attributes.funder.capital_types")) do |r|
          CapitalType.find_many(r.capital_types).map(&:name).join(", ")
        end
        column(I18n.t("activerecord.attributes.funder.capital_types_other")) { |r| r.capital_types_other }
        column(I18n.t("activerecord.attributes.funder.spend_down_strategy")) { |r| I18n.t r.spend_down_strategy }
        column(I18n.t("activerecord.attributes.funder.areas")) do |r|
          Area.find_many(r.areas).map(&:name).join(", ")
        end
        column(I18n.t("activerecord.attributes.funder.areas_other")) { |r| r.areas_other }
        column(I18n.t("activerecord.attributes.funder.demographics")) do |r|
          Demographic.find_many(r.demographics).map(&:name).join(", ")
        end
        column(I18n.t("activerecord.attributes.funder.demographics_other")) { |r| r.demographics_other }
        column(I18n.t("activerecord.attributes.funder.created_at")) { |r| I18n.l r.created_at }
        column(I18n.t("activerecord.attributes.funder.updated_at")) { |r| I18n.l r.updated_at }
      end
    end
  end
end
