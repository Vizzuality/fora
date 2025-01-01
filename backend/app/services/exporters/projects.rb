module Exporters
  class Projects < Base
    def initialize(query)
      super query, include_associations: [:member, recipient: %i[country state]]
    end

    def call
      generate_csv do
        column(I18n.t("activerecord.attributes.project.id")) { |r| r.id }
        column(I18n.t("activerecord.attributes.project.member")) { |r| r.member&.full_name }
        column(I18n.t("activerecord.attributes.recipient.name")) { |r| r.recipient.name }
        column(I18n.t("activerecord.attributes.recipient.description")) { |r| r.recipient.description }
        column(I18n.t("activerecord.attributes.recipient.contact_first_name")) { |r| r.recipient.contact_first_name }
        column(I18n.t("activerecord.attributes.recipient.contact_last_name")) { |r| r.recipient.contact_last_name }
        column(I18n.t("activerecord.attributes.recipient.website")) { |r| r.recipient.website }
        column(I18n.t("activerecord.attributes.recipient.country")) { |r| r.recipient.country.to_s }
        column(I18n.t("activerecord.attributes.recipient.state")) { |r| r.recipient.state.to_s }
        column(I18n.t("activerecord.attributes.recipient.city")) { |r| r.recipient.city }
        column(I18n.t("activerecord.attributes.recipient.leadership_demographics")) do |r|
          Demographic.find_many(r.recipient.leadership_demographics).map(&:name).join(", ")
        end
        column(I18n.t("activerecord.attributes.recipient.leadership_demographics_other")) do |r|
          r.recipient.leadership_demographics_other
        end
        column(I18n.t("activerecord.attributes.recipient.recipient_legal_status")) do |r|
          RecipientLegalStatus.find(r.recipient.recipient_legal_status)&.name
        end
        column(I18n.t("activerecord.attributes.project.created_at")) { |r| I18n.l r.created_at }
        column(I18n.t("activerecord.attributes.project.updated_at")) { |r| I18n.l r.updated_at }
      end
    end
  end
end
