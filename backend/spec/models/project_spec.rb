require "rails_helper"

RSpec.describe Project, type: :model do
  subject { build(:project) }

  it { is_expected.to be_valid }

  it "should not be valid without recipient" do
    subject.recipient = nil
    expect(subject).to have(1).errors_on(:recipient)
  end

  describe "scopes" do
    describe ".for_subgeographics" do
      let!(:country) { create :subgeographic, geographic: :countries }
      let!(:region) { create :subgeographic, geographic: :regions, parent: country }

      let!(:correct_project) { create :project, investments: [create(:investment, subgeographics: [region])] }
      let!(:ignored_project) { create :project }

      it "returns correct result for current subgeographic" do
        expect(Project.for_subgeographics(region.reload.abbreviation)).to eq([correct_project])
      end

      it "returns correct result for ancestor subgeographic" do
        expect(Project.for_subgeographics(country.reload.abbreviation)).to eq([correct_project])
      end
    end

    describe ".for_geographics" do
      let!(:country) { create :subgeographic, geographic: :countries }
      let!(:region) { create :subgeographic, geographic: :regions, parent: country }
      let!(:national) { create :subgeographic, geographic: :national, parent: country }

      let!(:project_1) { create :project, investments: [create(:investment, subgeographics: [region])] }
      let!(:project_2) { create :project, investments: [create(:investment, subgeographics: [national])] }

      it "returns correct result for current geographic" do
        expect(Project.for_geographics(:regions)).to eq([project_1])
        expect(Project.for_geographics(:national)).to eq([project_2])
      end

      it "returns correct result for ancestor geographic" do
        expect(Project.for_geographics(:countries)).to match_array([project_1, project_2])
      end
    end

    describe ".with_funders_count" do
      let!(:project) { create :project }
      let!(:project_without_funder) { create :project }
      let!(:investments) { create_list :investment, 2, project: project }
      let!(:investment_of_same_funder) { create :investment, project: project, funder: investments.first.funder }

      it "shows counts correct number of projects" do
        expect(Project.with_funders_count.find(project.id).funders_count).to eq(investments.count)
        expect(Project.with_funders_count.find(project_without_funder.id).funders_count).to be_zero
      end
    end
  end

  describe "#areas" do
    let!(:project) do
      create :project, investments: [create(:investment, areas: ["equity_and_justice"]), create(:investment, areas: ["food_sovereignty"])]
    end

    it "returns correct value" do
      expect(project.areas).to match_array(%w[equity_and_justice food_sovereignty])
    end
  end

  describe "#capital_types" do
    let!(:project) do
      create :project, investments: [create(:investment, capital_type: "grants"), create(:investment, capital_type: "mris")]
    end

    it "returns correct value" do
      expect(project.capital_types).to match_array(%w[grants mris])
    end
  end

  describe "#capital_type_other" do
    let!(:project) do
      create :project, investments: [create(:investment, capital_type_other: "TEST 1"), create(:investment, capital_type_other: "TEST 2")]
    end

    it "returns correct value" do
      expect(project.capital_type_other).to eq("TEST 1\nTEST 2")
    end
  end

  describe "#demographics" do
    let!(:project) do
      create :project, investments: [create(:investment, demographics: ["women"]), create(:investment, demographics: ["youth"])]
    end

    it "returns correct value" do
      expect(project.demographics).to match_array(%w[women youth])
    end
  end

  describe "#demographics_other" do
    let!(:project) do
      create :project, investments: [create(:investment, demographics_other: "TEST 1"), create(:investment, demographics_other: "TEST 2")]
    end

    it "returns correct value" do
      expect(project.demographics_other).to eq("TEST 1\nTEST 2")
    end
  end
end
