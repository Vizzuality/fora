require 'rails_helper'

RSpec.describe Subgeographic, type: :model do
  subject { build(:subgeographic) }

  it { is_expected.to be_valid }

  it "should not be valid without name" do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  it "should not be valid without code" do
    subject.code = nil
    expect(subject).to have(1).errors_on(:code)
  end

  include_examples :static_relation_validations, attribute: :geographic, presence: true
end
