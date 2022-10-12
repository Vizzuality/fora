require "rails_helper"

RSpec.describe RecipientSubgeographic, type: :model do
  subject { build(:recipient_subgeographic) }

  it { is_expected.to be_valid }

  it "should not be valid without recipient" do
    subject.recipient = nil
    expect(subject).to have(1).errors_on(:recipient)
  end

  it "should not be valid without subgeographic" do
    subject.subgeographic = nil
    expect(subject).to have(1).errors_on(:subgeographic)
  end
end
