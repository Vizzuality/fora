require "rails_helper"

RSpec.describe Funder, type: :model do
  subject { build(:funder) }

  it { is_expected.to be_valid }

  it "should not be valid without primary_office_country" do
    subject.primary_office_country = nil
    expect(subject).to have(1).errors_on(:primary_office_country)
  end

  it "should not be valid without name" do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  it "should not be valid without uniq name" do
    subject.save!
    funder = Funder.new subject.reload.attributes
    expect(funder).to have(1).errors_on(:name)
  end

  it "should not be valid without description" do
    subject.description = nil
    expect(subject).to have(1).errors_on(:description)
  end

  it "should not be valid without primary_office_city" do
    subject.primary_office_city = nil
    expect(subject).to have(1).errors_on(:primary_office_city)
  end

  it "should not be valid without primary_contact_first_name" do
    subject.primary_contact_first_name = nil
    expect(subject).to have(1).errors_on(:primary_contact_first_name)
  end

  it "should not be valid without primary_contact_last_name" do
    subject.primary_contact_last_name = nil
    expect(subject).to have(1).errors_on(:primary_contact_last_name)
  end

  it "should not be valid without primary_contact_email" do
    subject.primary_contact_email = nil
    expect(subject).to have(1).errors_on(:primary_contact_email)
  end

  it "should not be valid without date_joined_fora" do
    subject.date_joined_fora = nil
    expect(subject).to have(1).errors_on(:date_joined_fora)
  end

  it "should not be valid without number_staff_employees" do
    subject.number_staff_employees = nil
    expect(subject).to have(1).errors_on(:number_staff_employees)
  end

  it "it should not be valid with website which is not url" do
    subject.website = "THIS IS NOT URL"
    expect(subject).to have(1).errors_on(:website)
  end

  it "should not be valid when logo is not image" do
    subject.logo.attach fixture_file_upload("text_file.txt")
    expect(subject).to have(1).errors_on(:logo)
  end

  include_examples :static_relation_validations, attribute: :funder_type, presence: true
  include_examples :static_relation_validations, attribute: :capital_acceptances, presence: true
  include_examples :static_relation_validations, attribute: :leadership_demographics, presence: true
  include_examples :static_relation_validations, attribute: :application_status, presence: true
  include_examples :static_relation_validations, attribute: :funder_legal_status, presence: true
  include_examples :static_relation_validations, attribute: :capital_types, presence: true
  include_examples :static_relation_validations, attribute: :areas, presence: true
  include_examples :static_relation_validations, attribute: :demographics, presence: true

  describe "scopes" do
    describe ".for_subgeographics" do
      let!(:country) { create :subgeographic, geographic: :countries }
      let!(:region) { create :subgeographic, geographic: :regions, parent: country }

      let!(:correct_funder) { create :funder, subgeographics: [region] }
      let!(:ignored_funder) { create :funder }

      it "returns correct result for current subgeographic" do
        expect(Funder.for_subgeographics(region.reload.abbreviation)).to eq([correct_funder])
      end

      it "returns correct result for ancestor subgeographic" do
        expect(Funder.for_subgeographics(country.reload.abbreviation)).to eq([correct_funder])
      end
    end

    describe ".for_geographics" do
      let!(:country) { create :subgeographic, geographic: :countries }
      let!(:region) { create :subgeographic, geographic: :regions, parent: country }
      let!(:national) { create :subgeographic, geographic: :national, parent: country }

      let!(:funder_1) { create :funder, subgeographics: [region] }
      let!(:funder_2) { create :funder, subgeographics: [national] }

      it "returns correct result for current geographic" do
        expect(Funder.for_geographics(:regions)).to eq([funder_1])
        expect(Funder.for_geographics(:national)).to eq([funder_2])
      end

      it "returns correct result for ancestor geographic" do
        expect(Funder.for_geographics(:countries)).to match_array([funder_1, funder_2])
      end
    end

    describe ".with_projects_count" do
      let!(:funder) { create :funder }
      let!(:funder_without_project) { create :funder }
      let!(:investments) { create_list :investment, 2, funder: funder }
      let!(:investment_for_same_project) { create :investment, funder: funder, project: investments.first.project }

      it "shows counts correct number of projects" do
        expect(Funder.with_projects_count.find(funder.id).projects_count).to eq(investments.count)
        expect(Funder.with_projects_count.find(funder_without_project.id).projects_count).to be_zero
      end
    end
  end
end
