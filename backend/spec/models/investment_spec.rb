require "rails_helper"

RSpec.describe Investment, type: :model do
  subject { build(:investment) }

  it { is_expected.to be_valid }

  it "should not be valid without funder" do
    subject.funder = nil
    expect(subject).to have(1).errors_on(:funder)
  end

  it "should not be valid without project" do
    subject.project = nil
    expect(subject).to have(1).errors_on(:project)
  end

  it "should not be valid without amount" do
    subject.amount = nil
    expect(subject).to have(1).errors_on(:amount)
  end

  it "should not be valid without year_invested" do
    subject.year_invested = nil
    expect(subject).to have(1).errors_on(:year_invested)
  end

  it "should not be valid without initial_funded_year" do
    subject.initial_funded_year = nil
    expect(subject).to have(1).errors_on(:initial_funded_year)
  end

  it "should not be valid without number_of_grant_years when multi_year" do
    subject.assign_attributes number_of_grant_years: nil, grant_duration: "other"
    expect(subject).to be_valid
    subject.assign_attributes number_of_grant_years: nil, grant_duration: "multi_year"
    expect(subject).to have(1).errors_on(:number_of_grant_years)
  end

  it "should not be valid without funding_type when grants" do
    subject.assign_attributes funding_type: nil, capital_type: "other"
    expect(subject).to be_valid
    subject.assign_attributes funding_type: nil, capital_type: "grants"
    expect(subject).to have(1).errors_on(:funding_type)
  end

  include_examples :static_relation_validations, attribute: :funding_type, presence: false
  include_examples :static_relation_validations, attribute: :capital_type, presence: true
  include_examples :static_relation_validations, attribute: :areas, presence: true
  include_examples :static_relation_validations, attribute: :grant_duration, presence: true
  include_examples :static_relation_validations, attribute: :demographics, presence: false
  include_examples :static_relation_validations, attribute: :privacy, presence: true
end
