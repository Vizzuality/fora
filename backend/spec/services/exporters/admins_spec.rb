require "rails_helper"

RSpec.describe Exporters::Admins do
  subject { described_class.new(query) }

  before do
    create_list :admin, 4
  end

  let(:query) { Admin.all.order(:created_at) }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("activerecord.attributes.admin.id"),
        I18n.t("activerecord.attributes.admin.first_name"),
        I18n.t("activerecord.attributes.admin.last_name"),
        I18n.t("activerecord.attributes.admin.email"),
        I18n.t("activerecord.attributes.admin.is_super_admin"),
        I18n.t("activerecord.attributes.admin.created_at"),
        I18n.t("activerecord.attributes.admin.updated_at")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.id.to_s,
        query.first.first_name,
        query.first.last_name,
        query.first.email,
        I18n.t(query.first.is_super_admin),
        I18n.l(query.first.created_at),
        I18n.l(query.first.updated_at)
      ])
    end
  end
end
