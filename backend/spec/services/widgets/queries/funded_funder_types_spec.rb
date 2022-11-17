require "rails_helper"

RSpec.describe Widgets::Queries::FundedFunderTypes do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let(:funder_1) { create :funder, funder_type: "accelerator" }
    let(:funder_2) { create :funder, funder_type: "accelerator" }
    let(:funder_3) { create :funder, funder_type: "advisory" }
    let!(:investment_1) { create :investment, year_invested: 2021, amount: 10, funder: funder_1 }
    let!(:investment_2) { create :investment, year_invested: 2021, amount: 20, funder: funder_2 }
    let!(:investment_3) { create :investment, year_invested: 2021, amount: 20, funder: funder_3 }
    let!(:ignored_investment) { create :investment, year_invested: 2030, amount: 20, funder: funder_1 }

    it "contains correct header" do
      expect(result[:headers].first[:label]).to eq(I18n.t("activerecord.models.funder_type.one"))
      expect(result[:headers].first[:value]).to eq(:funder_type)
      expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.common.values"))
      expect(result[:headers].second[:value]).to eq(:values)
    end

    it "contains all funder types ordered by name" do
      FunderType.all.sort_by(&:name).each_with_index do |funder_type, index|
        expect(result[:values][index].first[:id]).to eq(funder_type.id)
        expect(result[:values][index].first[:value]).to eq(funder_type.name)
      end
    end

    it "has correct values for appropriate funder types" do
      expect(result[:values].find { |v| v.first[:id] == "accelerator" }.second[:value]).to eq(30)
      expect(result[:values].find { |v| v.first[:id] == "advisory" }.second[:value]).to eq(20)
    end
  end
end
