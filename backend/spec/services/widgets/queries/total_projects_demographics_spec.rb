require "rails_helper"

RSpec.describe Widgets::Queries::TotalProjectsDemographics do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let(:project_1) { create :project, recipient: create(:recipient, demographics: ["black_or_african_american"]) }
    let(:project_2) { create :project, recipient: create(:recipient, demographics: ["black_or_african_american", "indigenous_tribal_nations"]) }
    let!(:investment_1) { create :investment, year_invested: 2021, project: project_1 }
    let!(:investment_2) { create :investment, year_invested: 2021, project: project_2 }
    let!(:ignored_investment) { create :investment, year_invested: 2030, project: project_1 }

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
      expect(result[:values].find { |v| v.first[:id] == "black_or_african_american" }.second[:value]).to eq(2)
      expect(result[:values].find { |v| v.first[:id] == "indigenous_tribal_nations" }.second[:value]).to eq(1)
    end
  end
end
