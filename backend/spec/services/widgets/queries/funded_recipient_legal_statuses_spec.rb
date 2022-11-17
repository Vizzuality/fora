require "rails_helper"

RSpec.describe Widgets::Queries::FundedRecipientLegalStatuses do
  subject { described_class.new 2021 }

  describe "#call" do
    let(:result) { subject.call }
    let(:project_1) { create :project, recipient: create(:recipient, recipient_legal_status: "for_profit") }
    let(:project_2) { create :project, recipient: create(:recipient, recipient_legal_status: "for_profit") }
    let(:project_3) { create :project, recipient: create(:recipient, recipient_legal_status: "foundation") }
    let!(:investment_1) { create :investment, year_invested: 2021, amount: 10, project: project_1 }
    let!(:investment_2) { create :investment, year_invested: 2021, amount: 20, project: project_2 }
    let!(:investment_3) { create :investment, year_invested: 2021, amount: 20, project: project_3 }
    let!(:ignored_investment) { create :investment, year_invested: 2030, amount: 20, project: project_1 }

    it "contains correct header" do
      expect(result[:headers].first[:label]).to eq(I18n.t("activerecord.models.recipient_legal_status.one"))
      expect(result[:headers].first[:value]).to eq(:recipient_legal_status)
      expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.common.values"))
      expect(result[:headers].second[:value]).to eq(:values)
    end

    it "contains all recipient legal statuses ordered by name" do
      RecipientLegalStatus.all.sort_by(&:name).each_with_index do |recipient_legal_status, index|
        expect(result[:values][index].first[:id]).to eq(recipient_legal_status.id)
        expect(result[:values][index].first[:value]).to eq(recipient_legal_status.name)
      end
    end

    it "has correct values for appropriate recipient legal status" do
      expect(result[:values].find { |v| v.first[:id] == "for_profit" }.second[:value]).to eq(30)
      expect(result[:values].find { |v| v.first[:id] == "foundation" }.second[:value]).to eq(20)
    end
  end
end
