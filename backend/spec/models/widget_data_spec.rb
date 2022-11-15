require "rails_helper"
require "csv"

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

  describe "#to_csv" do
    let(:csv) { CSV.parse subject.to_csv }
    let(:query_data) { Widgets::Queries::Summary.new(widget.report_year, filters).call }

    it "returns correct data inside csv" do
      expect(csv.first).to eq(query_data[:headers].pluck(:label))
      expect(csv.second).to eq(query_data[:values].first.pluck(:value).map(&:to_s))
    end
  end
end
