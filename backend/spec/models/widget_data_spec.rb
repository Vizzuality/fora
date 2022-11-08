require "rails_helper"

RSpec.describe WidgetData, type: :model do
  subject { described_class.new widget: widget, filters: filters }

  let(:widget) { create :widget, slug: "summary" }
  let(:filters) { {areas: "test"} }

  it "returns correct title" do
    expect(subject.title).to eq(widget.title)
  end

  it "returns correct data" do
    expect(subject.data).to eq(Widgets::Queries::Summary.new(widget.report_year, filters).call)
  end
end
