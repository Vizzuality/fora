require "rails_helper"

RSpec.describe InvestmentSubgeographic, type: :model do
  subject { build(:investment_subgeographic) }

  it { is_expected.to be_valid }

  it "should not be valid without investment" do
    subject.investment = nil
    expect(subject).to have(1).errors_on(:investment)
  end

  it "should not be valid without subgeographic" do
    subject.subgeographic = nil
    expect(subject).to have(1).errors_on(:subgeographic)
  end
end
