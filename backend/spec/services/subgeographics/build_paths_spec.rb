require "rails_helper"

RSpec.describe Subgeographics::BuildPaths do
  subject { described_class.new subgeographics, ancestors }

  describe "#call" do
    let(:country) { create :subgeographic, geographic: :countries }
    let(:region) { create :subgeographic, geographic: :regions, parent: country }
    let(:state) { create :subgeographic, geographic: :states, parent: region }

    context "when one subgeographic without ancestors is provided" do
      let(:subgeographics) { [country] }
      let(:ancestors) { [] }

      it "returns correct result" do
        expect(subject.call).to eq([[country]])
      end
    end

    context "when multiple subgeographics with ancestors is provided" do
      let(:subgeographics) { [country, region, state] }
      let(:ancestors) { [country, region] }

      it "returns correct result" do
        expect(subject.call).to match_array([[country], [region, country], [state, region, country]])
      end
    end
  end
end
