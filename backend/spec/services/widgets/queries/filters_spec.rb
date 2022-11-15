require "rails_helper"

RSpec.describe Widgets::Queries::Filters do
  subject { Widgets::Queries::Summary.new 2021, filters }

  let(:filters) { {areas: "test_1,test_2"} }

  context "when there are no filters" do
    before do
      Widgets::Queries::Summary.send :reset_filters
    end

    it "does not contain any filters" do
      expect(subject.class.supported_filters).to be_empty
      expect(subject.class.support_filters?).to be_falsey
    end
  end

  context "when there are filters" do
    before do
      Widgets::Queries::Summary.send :register_filters, :areas
    end

    it "contains areas filter" do
      expect(subject.class.supported_filters).to eq([:areas])
      expect(subject.class.support_filters?).to be_truthy
    end

    it "has prepared accessor with filter data" do
      expect(subject.areas).to eq(filters[:areas].split(","))
    end
  end
end
