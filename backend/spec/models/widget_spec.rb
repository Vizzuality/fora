require "rails_helper"

RSpec.describe Widget, type: :model do
  subject { build(:widget) }

  it { is_expected.to be_valid }

  it "should not be valid without slug" do
    subject.slug = nil
    expect(subject).to have(1).errors_on(:slug)
  end

  it "should not be valid without uniq slug" do
    subject.save!
    widget = Widget.new subject.reload.attributes
    expect(widget).to have(1).errors_on(:slug)
  end

  it "should not be valid without position" do
    subject.position = nil
    expect(subject).to have(1).errors_on(:position)
  end

  include_examples :static_relation_validations, attribute: :report_pages, presence: true
  include_examples :static_relation_validations, attribute: :report_year, presence: true
  include_examples :static_relation_validations, attribute: :widget_type, presence: true
end
