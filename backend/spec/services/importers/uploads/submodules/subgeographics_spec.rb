require "rails_helper"

class DummySubgeographicsModule < Importers::Uploads::Base
  COLUMNS = {
    geographic_countries_first_part: "Geographic Focus - Countries (A - I)",
    geographic_countries_second_part: "Geographic Focus - Countries (J - Z)",
    geographic_states: "Geographic Focus - States (Public)"
  }.freeze

  private

  def create_with!(attr)
    funder = FactoryBot.build :funder, subgeographics: []
    assign_subgeographics_to funder, attr
    funder.save!
  end
end

RSpec.describe DummySubgeographicsModule do
  subject { described_class.new data, {}, [] }

  describe "#call - assigns subgeographics to newly created records" do
    let(:data) do
      [{
        "Geographic Focus - Countries (A - I)" => [],
        "Geographic Focus - Countries (J - Z)" => countries,
        "Geographic Focus - States (Public)" => states
      }]
    end
    let!(:usa_country) { create :subgeographic, geographic: :countries, name: "United States" }
    let(:countries) { [usa_country.name] }
    let(:states) { [] }
    let(:record) { Funder.last }

    context "when geographic focus is national" do
      let!(:national) { create :subgeographic, geographic: :national, name: "United States", parent: usa_country }
      let(:states) { [described_class::NATIONAL_SUBGEOGRAPHIC] }

      before { subject.call }

      it "assigns national subgeographic to record" do
        expect(record.subgeographics).to eq([national])
      end
    end

    context "when geographic focus is outside of us" do
      let!(:country) { create :subgeographic, geographic: :countries, name: "Croatia" }
      let(:countries) { [country.name] }
      let(:states) { [described_class::OUTSIDE_US_SUBGEOGRAPHIC] }

      before { subject.call }

      it "assigns countries subgeographic to record" do
        expect(record.subgeographics).to eq([country])
      end
    end

    context "when geographic focus is at us state" do
      let!(:state) { create :subgeographic, geographic: :states, name: "Georgia", parent: usa_country }
      let(:states) { [state.name] }

      before { subject.call }

      it "assigns states subgeographic to record" do
        expect(record.subgeographics).to eq([state])
      end
    end

    context "when multiple geographic types are combined" do
      let!(:country) { create :subgeographic, geographic: :countries, name: "Croatia" }
      let!(:state) { create :subgeographic, geographic: :states, name: "Georgia", parent: usa_country }
      let(:countries) { [usa_country.name, country.name] }
      let(:states) { [described_class::OUTSIDE_US_SUBGEOGRAPHIC, state.name] }

      before { subject.call }

      it "assigns correct subgeographics to record" do
        expect(record.subgeographics).to match_array([country, state])
      end
    end
  end
end
