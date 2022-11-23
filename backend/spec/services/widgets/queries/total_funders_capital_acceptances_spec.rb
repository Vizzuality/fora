require "rails_helper"

RSpec.describe Widgets::Queries::TotalFundersCapitalAcceptances do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let!(:funder_1) { create :funder, date_joined_fora: Date.new(2021), capital_acceptances: ["advises_and_manages_capital"] }
    let!(:funder_2) { create :funder, date_joined_fora: Date.new(2021), capital_acceptances: ["advises_and_manages_capital", "does_not_provide_funding"] }
    let!(:ignored_funder) { create :funder, date_joined_fora: Date.new(2030), capital_acceptances: ["advises_and_manages_capital"] }

    it "contains correct header" do
      expect(result[:headers].first[:label]).to eq(I18n.t("activerecord.models.capital_acceptance.one"))
      expect(result[:headers].first[:value]).to eq(:capital_acceptance)
      expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.common.values"))
      expect(result[:headers].second[:value]).to eq(:values)
    end

    it "contains all capital acceptances ordered by name" do
      CapitalAcceptance.all.sort_by(&:name).each_with_index do |capital_acceptance, index|
        expect(result[:values][index].first[:id]).to eq(capital_acceptance.id)
        expect(result[:values][index].first[:value]).to eq(capital_acceptance.name)
      end
    end

    it "has correct values for appropriate capital acceptances" do
      expect(result[:values].find { |v| v.first[:id] == "advises_and_manages_capital" }.second[:value]).to eq(2)
      expect(result[:values].find { |v| v.first[:id] == "does_not_provide_funding" }.second[:value]).to eq(1)
    end
  end
end
