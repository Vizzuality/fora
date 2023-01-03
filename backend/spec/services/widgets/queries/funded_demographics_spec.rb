require "rails_helper"

RSpec.describe Widgets::Queries::FundedDemographics do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let!(:investment_1) do
      create :investment, year_invested: 2021, amount: 10, privacy: "all", demographics: ["black_or_african_american"]
    end
    let!(:investment_2) do
      create :investment, year_invested: 2021, amount: 20, privacy: "aggregate_amount_funded", demographics: ["black_or_african_american", "indigenous_tribal_nations"]
    end
    let!(:ignored_investment_with_different_year) do
      create :investment, year_invested: 2030, privacy: "all", demographics: ["black_or_african_american"]
    end
    let!(:ignored_investment_with_different_privacy) do
      create :investment, year_invested: 2021, privacy: "amount_funded_visible_only_to_members", demographics: ["black_or_african_american"]
    end

    it "contains correct header" do
      expect(result[:headers].first[:label]).to eq(I18n.t("activerecord.models.demographic.one"))
      expect(result[:headers].first[:value]).to eq(:demographic)
      expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.common.values"))
      expect(result[:headers].second[:value]).to eq(:values)
    end

    it "contains all demographics ordered by name" do
      Demographic.all.sort_by(&:name).each_with_index do |demographic, index|
        expect(result[:values][index].first[:id]).to eq(demographic.id)
        expect(result[:values][index].first[:value]).to eq(demographic.name)
      end
    end

    it "has correct values for appropriate demographics" do
      expect(result[:values].find { |v| v.first[:id] == "black_or_african_american" }.second[:value]).to eq(20)
      expect(result[:values].find { |v| v.first[:id] == "indigenous_tribal_nations" }.second[:value]).to eq(10)
    end
  end
end
