require "rails_helper"

RSpec.describe Widgets::Queries::Summary do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let!(:funder) { create :funder, date_joined_fora: Date.new(2021) }
    let!(:ignored_funder) { create :funder, date_joined_fora: Date.new(2030) }
    let!(:project_1) { create :project }
    let!(:project_2) { create :project }
    let!(:investment_1) { create :investment, funder: funder, project: project_1, year_invested: 2021, capital_types: ["grants"], amount: 10 }
    let!(:investment_2) { create :investment, funder: funder, project: project_2, year_invested: 2021, capital_types: ["debt"], amount: 10 }
    let!(:ignored_investment) { create :investment, funder: funder, project: project_2, year_invested: 2030 }

    it "contains correct header" do
      expect(result[:headers].first[:label]).to eq(I18n.t("widgets.headers.summary.total_number_funders"))
      expect(result[:headers].first[:value]).to eq(:total_funders)
      expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.summary.total_number_projects"))
      expect(result[:headers].second[:value]).to eq(:total_projects)
      expect(result[:headers].third[:label]).to eq(I18n.t("widgets.headers.summary.total_capital"))
      expect(result[:headers].third[:value]).to eq(:total_capital)
      expect(result[:headers].fourth[:label]).to eq(I18n.t("widgets.headers.summary.total_grants"))
      expect(result[:headers].fourth[:value]).to eq(:total_grants)
    end

    it "contains correct data" do
      expect(result[:values].first.first[:value]).to eq(1)
      expect(result[:values].first.second[:value]).to eq(2)
      expect(result[:values].first.third[:value]).to eq(20)
      expect(result[:values].first.fourth[:value]).to eq(10)
    end
  end
end
