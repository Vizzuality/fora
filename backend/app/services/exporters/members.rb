module Exporters
  class Members < Base
    def initialize(query)
      super query, include_associations: [:funder]
    end

    def call
      generate_csv do
        column(I18n.t("activerecord.attributes.member.id")) { |r| r.id }
        column(I18n.t("activerecord.attributes.member.funder")) { |r| r.funder.name }
        column(I18n.t("activerecord.attributes.member.first_name")) { |r| r.first_name }
        column(I18n.t("activerecord.attributes.member.last_name")) { |r| r.last_name }
        column(I18n.t("activerecord.attributes.member.email")) { |r| r.email }
        column(I18n.t("activerecord.attributes.member.created_at")) { |r| I18n.l r.created_at }
        column(I18n.t("activerecord.attributes.member.updated_at")) { |r| I18n.l r.updated_at }
      end
    end
  end
end
