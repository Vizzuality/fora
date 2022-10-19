require "rails_helper"

RSpec.describe Importers::Subgeographics::Regions do
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
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_regions.geojson") }
      let(:region_alaska) { Subgeographic.regions.find_by code: "AL" }
      let(:region_mid_atlantic) { Subgeographic.regions.find_by code: "MA" }
      let!(:country) { create :subgeographic, geographic: :countries, code: "USA" }

      before { subject.call }

      it "creates correct regions" do
        expect(region_alaska.name).to eq("Alaska")
        expect(region_alaska.abbreviation).to eq("R-AL")
        expect(region_alaska.parent.code).to eq("USA")
        expect(region_mid_atlantic.name).to eq("Mid-Atlantic")
        expect(region_mid_atlantic.abbreviation).to eq("R-MA")
        expect(region_mid_atlantic.parent.code).to eq("USA")
      end

      it "creates geometries records" do
        expect(region_alaska.geometry).to eq(RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]}.to_json))
      end
    end
  end
end
