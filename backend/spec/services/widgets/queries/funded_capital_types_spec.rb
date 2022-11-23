require "rails_helper"

RSpec.describe Widgets::Queries::FundedCapitalTypes do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let!(:investment_1) { create :investment, year_invested: 2021, amount: 10, capital_types: ["grants"] }
    let!(:investment_2) { create :investment, year_invested: 2021, amount: 20, capital_types: ["grants", "debt"] }
    let!(:ignored_investment) { create :investment, year_invested: 2030, amount: 20, capital_types: ["grants"] }

    it "contains correct header" do
      expect(result[:headers].first[:label]).to eq(I18n.t("activerecord.models.capital_type.one"))
      expect(result[:headers].first[:value]).to eq(:capital_type)
      expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.common.values"))
      expect(result[:headers].second[:value]).to eq(:values)
    end

    it "contains all capital types ordered by name" do
      CapitalType.all.sort_by(&:name).each_with_index do |capital_type, index|
        expect(result[:values][index].first[:id]).to eq(capital_type.id)
        expect(result[:values][index].first[:value]).to eq(capital_type.name)
      end
    end

    it "has correct values for appropriate capital types" do
      expect(result[:values].find { |v| v.first[:id] == "grants" }.second[:value]).to eq(20)
      expect(result[:values].find { |v| v.first[:id] == "debt" }.second[:value]).to eq(10)
    end
  end
end
