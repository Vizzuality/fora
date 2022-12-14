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

  it "should not be valid without description" do
    subject.description = nil
    expect(subject).to have(1).errors_on(:description)
  end

  it "should not be valid without contact_first_name" do
    subject.contact_first_name = nil
    expect(subject).to have(1).errors_on(:contact_first_name)
  end

  it "should not be valid without contact_last_name" do
    subject.contact_last_name = nil
    expect(subject).to have(1).errors_on(:contact_last_name)
  end

  it "should not be valid without city" do
    subject.city = nil
    expect(subject).to have(1).errors_on(:city)
  end

  it "should not be valid when logo is not image" do
    subject.logo.attach fixture_file_upload("text_file.txt")
    expect(subject).to have(1).errors_on(:logo)
  end

  include_examples :static_relation_validations, attribute: :leadership_demographics, presence: false
  include_examples :static_relation_validations, attribute: :recipient_legal_status, presence: true
end
