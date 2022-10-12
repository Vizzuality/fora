require "rails_helper"

RSpec.describe Importers::Subgeographics::National do
  subject { described_class.new(path) }

  describe "#call" do
    context "when files does not exists at provided path" do
      let(:path) { "WRONG_PATH" }

      before { allow(subject).to receive(:puts).with("GeoJSON at #{path} with location data was not found. Skipping location import!") }

      it "return nil" do
        expect(subject.call).to be_nil
      end
    end

    context "when path with proper geojson is provided" do
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_national.geojson") }
      let(:national) { Subgeographic.national.first }
      let!(:country) { create :subgeographic, geographic: :countries, code: "USA" }

      before { subject.call }

      it "creates correct national" do
        expect(national.name).to eq("United States")
        expect(national.code).to eq("USA")
        expect(national.abbreviation).to eq("N-USA")
        expect(national.parent.code).to eq("USA")
      end

      it "creates geometries records" do
        expect(national.geometry).to eq(RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]}.to_json))
      end
    end
  end
end
