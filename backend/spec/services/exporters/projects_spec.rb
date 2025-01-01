require "rails_helper"

RSpec.describe Exporters::Projects do
  subject { described_class.new(query) }

  before do
    create_list :project, 4
  end

  let(:query) { Project.all.order(:created_at) }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("activerecord.attributes.project.id"),
        I18n.t("activerecord.attributes.project.member"),
        I18n.t("activerecord.attributes.recipient.name"),
        I18n.t("activerecord.attributes.recipient.description"),
        I18n.t("activerecord.attributes.recipient.contact_first_name"),
        I18n.t("activerecord.attributes.recipient.contact_last_name"),
        I18n.t("activerecord.attributes.recipient.website"),
        I18n.t("activerecord.attributes.recipient.country"),
        I18n.t("activerecord.attributes.recipient.state"),
        I18n.t("activerecord.attributes.recipient.city"),
        I18n.t("activerecord.attributes.recipient.leadership_demographics"),
        I18n.t("activerecord.attributes.recipient.leadership_demographics_other"),
        I18n.t("activerecord.attributes.recipient.recipient_legal_status"),
        I18n.t("activerecord.attributes.project.created_at"),
        I18n.t("activerecord.attributes.project.updated_at")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.id.to_s,
        query.first.member&.full_name,
        query.first.recipient.name,
        query.first.recipient.description,
        query.first.recipient.contact_first_name,
        query.first.recipient.contact_last_name,
        query.first.recipient.website,
        query.first.recipient.country.to_s,
        query.first.recipient.state.to_s,
        query.first.recipient.city,
        Demographic.find_many(query.first.recipient.leadership_demographics).map(&:name).join(", "),
        query.first.recipient.leadership_demographics_other,
        RecipientLegalStatus.find(query.first.recipient.recipient_legal_status).name,
        I18n.l(query.first.created_at),
        I18n.l(query.first.updated_at)
      ])
    end
  end
end
