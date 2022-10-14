require "rails_helper"

RSpec.describe Subgeographic, type: :model do
  subject { build(:subgeographic) }

  it { is_expected.to be_valid }

  it "should not be valid without name" do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  it "should not be valid without code" do
    subject.code = nil
    expect(subject).to have(1).errors_on(:code)
  end

  it "invalidates redis cache on commit" do
    expect(Rails.cache).to receive(:delete).with "geojson-#{subject.geographic}"
    subject.save!
  end

  include_examples :static_relation_validations, attribute: :geographic, presence: true

  describe "scopes" do
    describe ".only_active" do
      let!(:country) { create :subgeographic, geographic: :countries }
      let!(:region) { create :subgeographic, geographic: :regions, parent: country }

      it "ignores subgeographics which are not part of funder or recipient" do
        expect(Subgeographic.only_active).to be_empty
      end

      context "when subgeographic is used by funder" do
        let!(:funder) { create :funder, subgeographics: [region] }

        it "returns region subgeographic" do
          expect(Subgeographic.only_active).to include(region)
        end

        it "returns parent of region subgeographic (its country)" do
          expect(Subgeographic.only_active).to include(country)
        end
      end

      context "when subgeographic is used by recipient" do
        let!(:recipient) { create :recipient, subgeographics: [country] }

        it "returns country subgeographic" do
          expect(Subgeographic.only_active).to include(country)
        end

        it "ignores child of country subgeographic (its region)" do
          expect(Subgeographic.only_active).not_to include(region)
        end
      end
    end
  end

  describe ".as_geojson" do
    subject { described_class.as_geojson :regions }

    let!(:region) { create :subgeographic, geographic: :regions, parent: ignored_subgeographic }
    let!(:ignored_subgeographic) { create :subgeographic, geographic: :countries }

    it "returns correct number of features" do
      expect(subject[:type]).to eq("FeatureCollection")
      expect(subject[:features].size).to eq(1)
      expect(subject[:features].first[:type]).to eq("Feature")
    end

    it "returns correct properties inside geojson" do
      expect(subject[:features].first[:properties][:id]).to eq(region.id)
      expect(subject[:features].first[:properties][:code]).to eq(region.code)
      expect(subject[:features].first[:properties][:name]).to eq(region.name)
      expect(subject[:features].first[:properties][:abbreviation]).to eq("R-#{region.code}")
      expect(subject[:features].first[:properties][:parent_id]).to eq(ignored_subgeographic.id)
    end

    it "returns correct geometry inside geojson" do
      expect(subject[:features].first[:geometry]).to eq(RGeo::GeoJSON.encode(region.subgeographic_geometry.geometry))
    end
  end
end
