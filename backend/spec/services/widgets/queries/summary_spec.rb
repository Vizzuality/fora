require "rails_helper"

RSpec.describe Widgets::Queries::Summary do
  subject { Widgets::Queries::Summary.new 2021 }

  describe "#call" do
    let!(:funder) { create :funder, date_joined_fora: Date.new(2021) }
    let!(:ignored_funder) { create :funder, date_joined_fora: Date.new(2030) }
    let!(:project_1) { create :project }
    let!(:project_2) { create :project }
    let!(:investment_1) { create :investment, funder: funder, project: project_1, year_invested: 2021, capital_types: ["grants"], amount: 10 }
    let!(:investment_2) { create :investment, funder: funder, project: project_2, year_invested: 2021, capital_types: ["debt"], amount: 10 }
    let!(:ignored_investment) { create :investment, funder: funder, project: project_2, year_invested: 2030 }

    it "contains correct header" do
      expect(subject.call[:headers].first[:label]).to eq(I18n.t("widgets.headers.summary.total_number_funders"))
      expect(subject.call[:headers].first[:value]).to eq(:total_funders)
      expect(subject.call[:headers].second[:label]).to eq(I18n.t("widgets.headers.summary.total_number_projects"))
      expect(subject.call[:headers].second[:value]).to eq(:total_projects)
      expect(subject.call[:headers].third[:label]).to eq(I18n.t("widgets.headers.summary.total_capital"))
      expect(subject.call[:headers].third[:value]).to eq(:total_capital)
      expect(subject.call[:headers].fourth[:label]).to eq(I18n.t("widgets.headers.summary.total_grants"))
      expect(subject.call[:headers].fourth[:value]).to eq(:total_grants)
    end

    it "contains correct data" do
      expect(subject.call[:values].first[:value]).to eq(1)
      expect(subject.call[:values].second[:value]).to eq(2)
      expect(subject.call[:values].third[:value]).to eq(20)
      expect(subject.call[:values].fourth[:value]).to eq(10)
    end
  end
end
