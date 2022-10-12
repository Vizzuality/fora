require "rails_helper"

RSpec.describe Recipient, type: :model do
  subject { build(:recipient) }

  it { is_expected.to be_valid }

  it "should not be valid without country" do
    subject.country = nil
    expect(subject).to have(1).errors_on(:country)
  end

  it "should not be valid without name" do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  include_examples :static_relation_validations, attribute: :leadership_demographics, presence: false
  include_examples :static_relation_validations, attribute: :demographics, presence: true
  include_examples :static_relation_validations, attribute: :recipient_legal_status, presence: false
end
