require "rails_helper"

RSpec.describe Widgets::Queries::TotalFundersFunderTypes do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let!(:funder_1) { create :funder, funder_type: "accelerator" }
    let!(:funder_2) { create :funder, funder_type: "accelerator" }
    let!(:funder_3) { create :funder, funder_type: "advisory" }
    let!(:ignored_funder) { create :funder, funder_type: "accelerator" }
    let!(:ignored_funder_different_privacy) { create :funder, funder_type: "accelerator" }
    let!(:investment_1) { create :investment, funder: funder_1, year_invested: 2021, privacy: "all" }
    let!(:investment_2) { create :investment, funder: funder_2, year_invested: 2021, privacy: "all" }
    let!(:investment_3) { create :investment, funder: funder_3, year_invested: 2021, privacy: "all" }
    let!(:ignored_investment) { create :investment, funder: ignored_funder, year_invested: 2030, privacy: "all" }
    let!(:ignored_investment_with_different_privacy) do
      create :investment, funder: ignored_funder_different_privacy, year_invested: 2021, privacy: "visible_only_to_members"
    end

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
      expect(result[:values].find { |v| v.first[:id] == "accelerator" }.second[:value]).to eq(2)
      expect(result[:values].find { |v| v.first[:id] == "advisory" }.second[:value]).to eq(1)
    end
  end
end
