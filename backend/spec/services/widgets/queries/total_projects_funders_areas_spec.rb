require "rails_helper"

RSpec.describe Widgets::Queries::TotalProjectsFundersAreas do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let(:funder_1) { create :funder, date_joined_fora: Date.new(2021), areas: ["equity_and_justice"] }
    let(:funder_2) { create :funder, date_joined_fora: Date.new(2021), areas: ["food_sovereignty"] }
    let!(:investment_1) do
      create :investment, year_invested: 2021, privacy: "all", funder: funder_1, areas: ["equity_and_justice"]
    end
    let!(:investment_2) do
      create :investment, year_invested: 2021, privacy: "amount_funded_visible_only_to_members", funder: funder_2, areas: ["equity_and_justice", "food_sovereignty"]
    end
    let!(:ignored_investment_with_different_year) do
      create :investment, year_invested: 2030, privacy: "all", funder: funder_2, areas: ["equity_and_justice"]
    end
    let!(:ignored_investment_with_different_privacy) do
      create :investment, year_invested: 2021, privacy: "visible_only_to_members", funder: funder_2, areas: ["equity_and_justice"]
    end

    it "contains correct header" do
      expect(result[:headers].first[:label]).to eq(I18n.t("activerecord.models.area.one"))
      expect(result[:headers].first[:value]).to eq(:area_of_focus)
      expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.total_projects_funders_areas.total_projects"))
      expect(result[:headers].second[:value]).to eq(:total_projects)
      expect(result[:headers].third[:label]).to eq(I18n.t("widgets.headers.total_projects_funders_areas.total_funders"))
      expect(result[:headers].third[:value]).to eq(:total_funders)
    end

    it "contains all areas of focus ordered by name" do
      Area.all.sort_by(&:name).each_with_index do |area, index|
        expect(result[:values][index].first[:id]).to eq(area.id)
        expect(result[:values][index].first[:value]).to eq(area.name)
      end
    end

    it "has correct values for total projects" do
      expect(result[:values].find { |v| v.first[:id] == "equity_and_justice" }.second[:value]).to eq(2)
      expect(result[:values].find { |v| v.first[:id] == "food_sovereignty" }.second[:value]).to eq(1)
    end

    it "has correct values for total funders" do
      expect(result[:values].find { |v| v.first[:id] == "equity_and_justice" }.third[:value]).to eq(1)
      expect(result[:values].find { |v| v.first[:id] == "food_sovereignty" }.third[:value]).to eq(1)
    end
  end
end
