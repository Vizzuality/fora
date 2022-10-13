require "rails_helper"

RSpec.describe Importers::Subgeographics::Countries do
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
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_countries.geojson") }
      let(:country_aruba) { Subgeographic.countries.find_by name: "Aruba" }
      let(:country_angola) { Subgeographic.countries.find_by name: "Angola" }

      before { subject.call }

      it "creates correct countries" do
        expect(country_aruba.code).to eq("ABW")
        expect(country_aruba.abbreviation).to eq("C-ABW")
        expect(country_angola.code).to eq("AGO")
        expect(country_angola.abbreviation).to eq("C-AGO")
      end

      it "creates geometries records" do
        expect(country_aruba.geometry).to eq(RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]}.to_json))
      end
    end
  end
end
