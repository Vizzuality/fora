require "rails_helper"

RSpec.describe Widgets::Queries::TotalProjectsFundersSubgeographics do
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
        expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.total_projects_funders_areas.total_projects"))
        expect(result[:headers].second[:value]).to eq(:total_projects)
        expect(result[:headers].third[:label]).to eq(I18n.t("widgets.headers.total_projects_funders_areas.total_funders"))
        expect(result[:headers].third[:value]).to eq(:total_funders)
      end
    end

    context "when used with countries geographic filter" do
      let(:filters) { {geographic: "countries"} }
      let!(:country_1) { create :subgeographic, geographic: :countries, name: "AAAA" }
      let!(:region) { create :subgeographic, geographic: :regions, parent: country_1 }
      let!(:country_2) { create :subgeographic, geographic: :countries, name: "CCCC" }
      let!(:ignored_country) { create :subgeographic, geographic: :countries, name: "BBBB" }
      let!(:project_1) { create :project, recipient: create(:recipient, subgeographics: [region]) }
      let!(:project_2) { create :project, recipient: create(:recipient, subgeographics: [country_1, country_2]) }
      let!(:funder_1) { create :funder, date_joined_fora: Date.new(2021), subgeographics: [country_1] }
      let!(:funder_2) { create :funder, date_joined_fora: Date.new(2021), subgeographics: [country_2] }
      let!(:ignored_funder) { create :funder, date_joined_fora: Date.new(2030), subgeographics: [country_2] }
      let!(:investment_1) { create :investment, year_invested: 2021, project: project_1, funder: funder_1 }
      let!(:investment_2) { create :investment, year_invested: 2021, project: project_2, funder: funder_2 }
      let!(:ignored_investment) { create :investment, year_invested: 2030, project: project_1, funder: funder_1 }

      it "contains correct header" do
        expect(result[:headers].first[:label]).to eq(Geographic.find("countries").name)
        expect(result[:headers].first[:value]).to eq(:geographic)
        expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.total_projects_funders_areas.total_projects"))
        expect(result[:headers].second[:value]).to eq(:total_projects)
        expect(result[:headers].third[:label]).to eq(I18n.t("widgets.headers.total_projects_funders_areas.total_funders"))
        expect(result[:headers].third[:value]).to eq(:total_funders)
      end

      it "contains all countries ordered by name" do
        expect(result[:values].count).to eq(2)
        expect(result[:values][0].first[:id]).to eq(country_1.id)
        expect(result[:values][0].first[:value]).to eq(country_1.name)
        expect(result[:values][1].first[:id]).to eq(country_2.id)
        expect(result[:values][1].first[:value]).to eq(country_2.name)
      end

      it "has correct total projects values for appropriate countries" do
        expect(result[:values].find { |v| v.first[:id] == country_1.id }.second[:value]).to eq(2)
        expect(result[:values].find { |v| v.first[:id] == country_2.id }.second[:value]).to eq(1)
      end

      it "has correct total funders values for appropriate countries" do
        expect(result[:values].find { |v| v.first[:id] == country_1.id }.third[:value]).to eq(1)
        expect(result[:values].find { |v| v.first[:id] == country_2.id }.third[:value]).to eq(1)
      end
    end

    context "when used with regions geographic filter" do
      let(:filters) { {geographic: "regions"} }
      let!(:region_1) { create :subgeographic, geographic: :regions, name: "AAAA" }
      let!(:state) { create :subgeographic, geographic: :states, parent: region_1 }
      let!(:region_2) { create :subgeographic, geographic: :regions, name: "CCCC" }
      let!(:region_3) { create :subgeographic, geographic: :regions, name: "BBBB" }
      let!(:project_1) { create :project, recipient: create(:recipient, subgeographics: [state]) }
      let!(:project_2) { create :project, recipient: create(:recipient, subgeographics: [region_1, region_2]) }
      let!(:funder_1) { create :funder, date_joined_fora: Date.new(2021), subgeographics: [region_1] }
      let!(:funder_2) { create :funder, date_joined_fora: Date.new(2021), subgeographics: [region_2] }
      let!(:ignored_funder) { create :funder, date_joined_fora: Date.new(2030), subgeographics: [region_2] }
      let!(:investment_1) { create :investment, year_invested: 2021, amount: 10, project: project_1, funder: funder_1 }
      let!(:investment_2) { create :investment, year_invested: 2021, amount: 20, project: project_2, funder: funder_2 }
      let!(:ignored_investment) { create :investment, year_invested: 2030, amount: 10, project: project_1, funder: funder_1 }

      it "contains correct header" do
        expect(result[:headers].first[:label]).to eq(Geographic.find("regions").name)
        expect(result[:headers].first[:value]).to eq(:geographic)
        expect(result[:headers].second[:label]).to eq(I18n.t("widgets.headers.total_projects_funders_areas.total_projects"))
        expect(result[:headers].second[:value]).to eq(:total_projects)
        expect(result[:headers].third[:label]).to eq(I18n.t("widgets.headers.total_projects_funders_areas.total_funders"))
        expect(result[:headers].third[:value]).to eq(:total_funders)
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

      it "has correct total projects values for appropriate regions" do
        expect(result[:values].find { |v| v.first[:id] == region_1.id }.second[:value]).to eq(2)
        expect(result[:values].find { |v| v.first[:id] == region_2.id }.second[:value]).to eq(1)
        expect(result[:values].find { |v| v.first[:id] == region_3.id }.second[:value]).to eq(0)
      end

      it "has correct total funders values for appropriate regions" do
        expect(result[:values].find { |v| v.first[:id] == region_1.id }.third[:value]).to eq(1)
        expect(result[:values].find { |v| v.first[:id] == region_2.id }.third[:value]).to eq(1)
        expect(result[:values].find { |v| v.first[:id] == region_3.id }.third[:value]).to eq(0)
      end
    end
  end
end