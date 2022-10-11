require "rails_helper"

RSpec.describe Project, type: :model do
  subject { build(:project) }

  it { is_expected.to be_valid }

  it "should not be valid without recipient" do
    subject.recipient = nil
    expect(subject).to have(1).errors_on(:recipient)
  end
end
