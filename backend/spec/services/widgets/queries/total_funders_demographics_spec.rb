require "rails_helper"

RSpec.describe Widgets::Queries::TotalFundersDemographics do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let!(:funder_1) { create :funder, date_joined_fora: Date.new(2021) }
    let!(:funder_2) { create :funder, date_joined_fora: Date.new(2021) }
    let!(:ignored_funder) { create :funder, date_joined_fora: Date.new(2030) }
    let!(:investment_1) { create :investment, funder: funder_1, demographics: ["black_or_african_american"] }
    let!(:investment_2) do
      create :investment, funder: funder_2, demographics: ["black_or_african_american", "indigenous_tribal_nations"]
    end
    let!(:ignored_investment) { create :investment, funder: ignored_funder }

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

    it "has correct values for appropriate demographic" do
      expect(result[:values].find { |v| v.first[:id] == "black_or_african_american" }.second[:value]).to eq(2)
      expect(result[:values].find { |v| v.first[:id] == "indigenous_tribal_nations" }.second[:value]).to eq(1)
    end
  end
end
