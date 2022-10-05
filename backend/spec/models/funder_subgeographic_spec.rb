require "rails_helper"

RSpec.describe FunderSubgeographic, type: :model do
  subject { build(:funder_subgeographic) }

  it { is_expected.to be_valid }

  it "should not be valid without funder" do
    subject.funder = nil
    expect(subject).to have(1).errors_on(:funder)
  end

  it "should not be valid without subgeographic" do
    subject.subgeographic = nil
    expect(subject).to have(1).errors_on(:subgeographic)
  end
end
