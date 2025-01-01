module Exporters
  class Admins < Base
    def call
      generate_csv do
        column(I18n.t("activerecord.attributes.admin.id")) { |r| r.id }
        column(I18n.t("activerecord.attributes.admin.first_name")) { |r| r.first_name }
        column(I18n.t("activerecord.attributes.admin.last_name")) { |r| r.last_name }
        column(I18n.t("activerecord.attributes.admin.email")) { |r| r.email }
        column(I18n.t("activerecord.attributes.admin.is_super_admin")) { |r| I18n.t r.is_super_admin }
        column(I18n.t("activerecord.attributes.admin.created_at")) { |r| I18n.l r.created_at }
        column(I18n.t("activerecord.attributes.admin.updated_at")) { |r| I18n.l r.updated_at }
      end
    end
  end
end
