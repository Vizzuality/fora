require "rails_helper"

RSpec.describe Importers::Subgeographics::States do
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
      let(:path) { Rails.root.join("spec/fixtures/files/dummy_states.geojson") }
      let(:state_alaska) { Subgeographic.states.find_by code: "AK" }
      let(:state_alabama) { Subgeographic.states.find_by code: "AL" }
      let!(:region_alaska) { create :subgeographic, geographic: :regions, code: "AL" }
      let!(:region_southeast) { create :subgeographic, geographic: :regions, code: "SE" }

      before { subject.call }

      it "creates correct states" do
        expect(state_alaska.name).to eq("Alaska")
        expect(state_alaska.parent.code).to eq("AL")
        expect(state_alabama.name).to eq("Alabama")
        expect(state_alabama.parent.code).to eq("SE")
      end

      it "creates geometries records" do
        expect(state_alaska.geometry).to eq(RGeo::GeoJSON.decode({type: "Polygon", coordinates: [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]}.to_json))
      end
    end
  end
end
