require "rails_helper"

RSpec.describe Widgets::Queries::FundedAreas do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let!(:investment_1) { create :investment, year_invested: 2021, amount: 10, areas: ["equity_and_justice"] }
    let!(:investment_2) { create :investment, year_invested: 2021, amount: 20, areas: ["equity_and_justice", "food_sovereignty"] }
    let!(:ignored_investment) { create :investment, year_invested: 2030, amount: 20, areas: ["equity_and_justice"] }

    it "contains correct header" do
      expect(result[:headers].first[:label]).to eq(I18n.t("widgets.headers.funded_areas.area_of_focus"))
      expect(result[:headers].first[:value]).to eq(:area_of_focus)
      expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.funded_areas.funded_with"))
      expect(result[:headers].second[:value]).to eq(:funded_with)
    end

    it "contains all areas of focus ordered by name" do
      Area.all.sort_by(&:name).each_with_index do |area, index|
        expect(result[:values][index].first[:id]).to eq(area.id)
        expect(result[:values][index].first[:value]).to eq(area.name)
      end
    end

    it "has correct values for appropriate areas" do
      expect(result[:values].find { |v| v.first[:id] == "equity_and_justice" }.second[:value]).to eq(20)
      expect(result[:values].find { |v| v.first[:id] == "food_sovereignty" }.second[:value]).to eq(10)
    end
  end
end
