require "rails_helper"

RSpec.describe Exporters::Investments do
  subject { described_class.new(query) }

  before do
    create_list :investment, 4
  end

  let(:query) { Investment.all.order(:created_at) }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("activerecord.attributes.investment.id"),
        I18n.t("activerecord.attributes.investment.funder"),
        I18n.t("activerecord.attributes.investment.project"),
        I18n.t("activerecord.attributes.investment.amount"),
        I18n.t("activerecord.attributes.investment.year_invested"),
        I18n.t("activerecord.attributes.investment.initial_funded_year"),
        I18n.t("activerecord.attributes.investment.funding_type"),
        I18n.t("activerecord.attributes.investment.funding_type_other"),
        I18n.t("activerecord.attributes.investment.areas"),
        I18n.t("activerecord.attributes.investment.areas_other"),
        I18n.t("activerecord.attributes.investment.grant_duration"),
        I18n.t("activerecord.attributes.investment.number_of_grant_years"),
        I18n.t("activerecord.attributes.investment.demographics"),
        I18n.t("activerecord.attributes.investment.demographics_other"),
        I18n.t("activerecord.attributes.investment.capital_type"),
        I18n.t("activerecord.attributes.investment.capital_type_other"),
        I18n.t("activerecord.attributes.investment.submitting_organization_contact_name"),
        I18n.t("activerecord.attributes.investment.privacy"),
        I18n.t("activerecord.attributes.investment.created_at"),
        I18n.t("activerecord.attributes.investment.updated_at")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.id.to_s,
        query.first.funder&.name,
        query.first.project&.recipient&.name,
        query.first.amount.to_s,
        query.first.year_invested.to_s,
        query.first.initial_funded_year.to_s,
        FundingType.find(query.first.funding_type)&.name,
        query.first.funding_type_other,
        Area.find_many(query.first.areas).map(&:name).join(", "),
        query.first.areas_other,
        GrantDuration.find(query.first.grant_duration)&.name,
        query.first.number_of_grant_years.to_s,
        Demographic.find_many(query.first.demographics).map(&:name).join(", "),
        query.first.demographics_other,
        CapitalType.find(query.first.capital_type)&.name,
        query.first.capital_type_other,
        query.first.submitting_organization_contact_name,
        InvestmentPrivacy.find(query.first.privacy)&.name,
        I18n.l(query.first.created_at),
        I18n.l(query.first.updated_at)
      ])
    end
  end
end
