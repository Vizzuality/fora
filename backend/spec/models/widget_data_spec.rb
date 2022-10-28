require "rails_helper"

RSpec.describe WidgetData, type: :model do
  subject { build(:widget_data) }

  it { is_expected.to be_valid }

  it "should not be valid without widget" do
    subject.widget = nil
    expect(subject).to have(1).errors_on(:widget)
  end

  it "should not be valid without uniq filter_key" do
    subject.save!
    widget_data = WidgetData.new subject.reload.attributes
    expect(widget_data).to have(1).errors_on(:filter_key)
  end

  it "should not be valid without data" do
    subject.data = nil
    expect(subject).to have(1).errors_on(:data)
  end
end
