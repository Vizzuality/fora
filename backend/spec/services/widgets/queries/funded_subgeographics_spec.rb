require "rails_helper"

RSpec.describe Widgets::Queries::FundedSubgeographics do
  subject { described_class.new 2021, filters }
  let(:filters) { {geographic: "countries"} }

  it "supports cache" do
    expect(subject.enabled_cache?).to be_truthy
  end

  it "uses geographic filter as part of cache key" do
    expect(subject.cache_key).to eq("geographic=countries")
  end

  describe "#call" do
    let(:result) { subject.call }

    context "when used without geographic filter" do
      let(:filters) { {} }

      it "fallbacks to countries" do
        expect(result[:headers].first[:label]).to eq(Geographic.find("countries").name)
        expect(result[:headers].first[:value]).to eq(:geographic)
        expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.common.funded_with"))
        expect(result[:headers].second[:value]).to eq(:funded_with)
      end
    end

    context "when used with countries geographic filter" do
      let(:filters) { {geographic: "countries"} }
      let!(:country_1) { create :subgeographic, geographic: :countries, name: "AAAA" }
      let!(:region) { create :subgeographic, geographic: :regions, parent: country_1 }
      let!(:country_2) { create :subgeographic, geographic: :countries, name: "CCCC" }
      let!(:ignored_country) { create :subgeographic, geographic: :countries, name: "BBBB" }
      let!(:funder) { create :funder, subgeographics: [country_1] }
      let!(:investment_1) do
        create :investment, year_invested: 2021, amount: 10, privacy: "all", funder: funder, subgeographics: [region]
      end
      let!(:investment_2) do
        create :investment, year_invested: 2021, amount: 20, privacy: "aggregate_amount_funded", funder: funder, subgeographics: [country_1, country_2]
      end
      let!(:ignored_investment_with_different_year) do
        create :investment, year_invested: 2030, privacy: "all", funder: funder, subgeographics: [region]
      end
      let!(:ignored_investment_with_different_privacy) do
        create :investment, year_invested: 2021, privacy: "amount_funded_visible_only_to_members", funder: funder, subgeographics: [region]
      end

      it "contains correct header" do
        expect(result[:headers].first[:label]).to eq(Geographic.find("countries").name)
        expect(result[:headers].first[:value]).to eq(:geographic)
        expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.common.funded_with"))
        expect(result[:headers].second[:value]).to eq(:funded_with)
      end

      it "contains all countries ordered by name" do
        expect(result[:values].count).to eq(2)
        expect(result[:values][0].first[:id]).to eq(country_1.id)
        expect(result[:values][0].first[:value]).to eq(country_1.name)
        expect(result[:values][1].first[:id]).to eq(country_2.id)
        expect(result[:values][1].first[:value]).to eq(country_2.name)
      end

      it "has correct values for appropriate countries" do
        expect(result[:values].find { |v| v.first[:id] == country_1.id }.second[:value]).to eq(20)
        expect(result[:values].find { |v| v.first[:id] == country_2.id }.second[:value]).to eq(10)
      end
    end

    context "when used with regions geographic filter" do
      let(:filters) { {geographic: "regions"} }
      let!(:region_1) { create :subgeographic, geographic: :regions, name: "AAAA" }
      let!(:state) { create :subgeographic, geographic: :states, parent: region_1 }
      let!(:region_2) { create :subgeographic, geographic: :regions, name: "CCCC" }
      let!(:region_3) { create :subgeographic, geographic: :regions, name: "BBBB" }
      let!(:funder) { create :funder, subgeographics: [region_1] }
      let!(:investment_1) do
        create :investment, year_invested: 2021, amount: 10, privacy: "all", funder: funder, subgeographics: [state]
      end
      let!(:investment_2) do
        create :investment, year_invested: 2021, amount: 20, privacy: "aggregate_amount_funded", funder: funder, subgeographics: [region_1, region_2]
      end
      let!(:ignored_investment_with_different_year) do
        create :investment, year_invested: 2030, privacy: "all", funder: funder, subgeographics: [state]
      end
      let!(:ignored_investment_with_different_privacy) do
        create :investment, year_invested: 2021, privacy: "amount_funded_visible_only_to_members", funder: funder, subgeographics: [state]
      end

      it "contains correct header" do
        expect(result[:headers].first[:label]).to eq(Geographic.find("regions").name)
        expect(result[:headers].first[:value]).to eq(:geographic)
        expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.common.funded_with"))
        expect(result[:headers].second[:value]).to eq(:funded_with)
      end

      it "contains all regions ordered by name" do
        expect(result[:values].count).to eq(3)
        expect(result[:values][0].first[:id]).to eq(region_1.id)
        expect(result[:values][0].first[:value]).to eq(region_1.name)
        expect(result[:values][1].first[:id]).to eq(region_3.id)
        expect(result[:values][1].first[:value]).to eq(region_3.name)
        expect(result[:values][2].first[:id]).to eq(region_2.id)
        expect(result[:values][2].first[:value]).to eq(region_2.name)
      end

      it "has correct values for appropriate regions" do
        expect(result[:values].find { |v| v.first[:id] == region_1.id }.second[:value]).to eq(20)
        expect(result[:values].find { |v| v.first[:id] == region_2.id }.second[:value]).to eq(10)
        expect(result[:values].find { |v| v.first[:id] == region_3.id }.second[:value]).to eq(0)
      end

      context "when investment is done also to different country" do
        let!(:country) { create :subgeographic, geographic: :countries }
        let!(:investment_1) do
          create :investment, year_invested: 2021, amount: 10, privacy: "all", funder: funder, subgeographics: [state, country]
        end
        let!(:investment_2) do
          create :investment, year_invested: 2021, amount: 20, privacy: "all", funder: funder, subgeographics: [region_1, region_2]
        end

        it "has correct values for appropriate regions" do
          expect(result[:values].find { |v| v.first[:id] == region_1.id }.second[:value]).to eq(15)
          expect(result[:values].find { |v| v.first[:id] == region_2.id }.second[:value]).to eq(10)
          expect(result[:values].find { |v| v.first[:id] == region_3.id }.second[:value]).to eq(0)
        end
      end

      context "when investment is done also to region and state of same region" do
        let!(:country) { create :subgeographic, geographic: :countries }
        let!(:investment_1) do
          create :investment, year_invested: 2021, amount: 10, privacy: "all", funder: funder, subgeographics: [state, region_1]
        end
        let!(:investment_2) do
          create :investment, year_invested: 2021, amount: 20, privacy: "all", funder: funder, subgeographics: [region_1, region_2]
        end

        it "has correct values for appropriate regions" do
          expect(result[:values].find { |v| v.first[:id] == region_1.id }.second[:value]).to eq(20)
          expect(result[:values].find { |v| v.first[:id] == region_2.id }.second[:value]).to eq(10)
          expect(result[:values].find { |v| v.first[:id] == region_3.id }.second[:value]).to eq(0)
        end
      end
    end
  end
end
