require "rails_helper"

RSpec.describe Exporters::Members do
  subject { described_class.new(query) }

  before do
    create_list :member, 4
  end

  let(:query) { Member.all.order(:created_at) }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("activerecord.attributes.member.id"),
        I18n.t("activerecord.attributes.member.funder"),
        I18n.t("activerecord.attributes.member.first_name"),
        I18n.t("activerecord.attributes.member.last_name"),
        I18n.t("activerecord.attributes.member.email"),
        I18n.t("activerecord.attributes.member.created_at"),
        I18n.t("activerecord.attributes.member.updated_at")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.id.to_s,
        query.first.funder.name,
        query.first.first_name,
        query.first.last_name,
        query.first.email,
        I18n.l(query.first.created_at),
        I18n.l(query.first.updated_at)
      ])
    end
  end
end
