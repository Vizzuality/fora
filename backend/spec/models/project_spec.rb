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

      let!(:correct_project) { create :project, recipient: create(:recipient, subgeographics: [region]) }
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

      let!(:project_1) { create :project, recipient: create(:recipient, subgeographics: [region]) }
      let!(:project_2) { create :project, recipient: create(:recipient, subgeographics: [national]) }

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
end
