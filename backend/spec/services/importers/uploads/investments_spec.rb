require "rails_helper"

RSpec.describe Importers::Uploads::Investments do
  subject { described_class.new(data, {}, []) }

  describe "#call" do
    let(:data) do
      [{
        "Respondent ID" => "118188164108",
        "Submitting Organization Name (Public)" => "Armonia LLC",
        "Submitting Organization Contact Name (First and Last | Only FORA)" => "Kirby",
        "Partner Organization Name (Public). If the organization's name is in the dropdown, choose it and you may jump to Question 20. If not, please choose \"Organization Not Listed\" and continue with the questions." => "Organization Not Listed",
        "Partner Organization Name (Public)" => "Llama",
        "Privacy: Can this funding information be shared on the platform?" => "Yes, ALL of the information can be shared on the platform, including non-aggregated funding amount",
        "Amount Funded" => "100",
        "Year of Investment" => "2022",
        "Initial Year Funded" => "2018",
        "Capital Type" => "Grant",
        "Funding Type (if a grant)" => "General operating support",
        "Duration of Grant/Investment" => "Multi-year",
        "If Multi-Year, Number of Years" => "2",
        "Areas of focus for this funding (select all that apply)" => ["Agroforestry", "Alternative Proteins"],
        "Do you collect information on the demographic focus of your partner organizations?" => "Yes",
        "If yes, what is the demographic focus of this partner organization? (select all that apply | Public)" => ["Black or African American", "Indigenous/Tribal Nations"],
        "Geographic Focus - Countries (Select all that apply | alphabetical from A - I, move to next question for J - Z | Public)" => ["Country Not Listed"],
        "Geographic Focus - Countries (Select all that apply | alphabetical from J - Z] | Public)" => ["Jamaica"],
        "Geographic Focus - States (Public)" => ["No state focus, they work nationally"]
      }]
    end
    let!(:usa_country) { create :subgeographic, geographic: :countries, name: "United States" }
    let!(:national) { create :subgeographic, geographic: :national, name: "United States", parent: usa_country }
    let!(:jamaica) { create :subgeographic, geographic: :countries, name: "Jamaica" }
    let!(:project) { create :project, recipient: create(:recipient, name: "Llama") }
    let!(:funder) { create :funder, name: "Armonia LLC" }
    let(:investment) { Investment.last }

    before { subject.call }

    it "creates new investment" do
      expect(investment).to be_present
    end

    it "does not raise any error" do
      expect(subject.errors).to be_empty
    end

    it "assigns correct values to investment attributes" do
      expect(investment.funder).to eq(funder)
      expect(investment.submitting_organization_contact_name).to eq("Kirby")
      expect(investment.project).to eq(project)
      expect(investment.privacy).to eq("all")
      expect(investment.amount).to eq(100)
      expect(investment.year_invested).to eq(2022)
      expect(investment.initial_funded_year).to eq(2018)
      expect(investment.capital_type).to eq("grants")
      expect(investment.capital_type_other).to be_nil
      expect(investment.funding_type).to eq("general_operating_support")
      expect(investment.funding_type_other).to be_nil
      expect(investment.grant_duration).to eq("multi_year")
      expect(investment.number_of_grant_years).to eq(2)
      expect(investment.areas).to match_array(["agroforestry", "alternative_proteins"])
      expect(investment.areas_other).to be_nil
      expect(investment.demographics).to match_array(["black_or_african_american", "indigenous_tribal_nations"])
      expect(investment.demographics_other).to be_nil
      expect(investment.subgeographics).to match_array([national, jamaica])
    end

    context "when provided data are not valid" do
      let(:data) do
        [{
          "Respondent ID" => "118188164108",
          "Submitting Organization Name (Public)" => "Armonia LLC",
          "Submitting Organization Contact Name (First and Last | Only FORA)" => "Kirby",
          "Partner Organization Name (Public). If the organization's name is in the dropdown, choose it and you may jump to Question 20. If not, please choose \"Organization Not Listed\" and continue with the questions." => "Organization Not Listed",
          "Partner Organization Name (Public)" => "Llama"
        }]
      end

      it "does not create new funder" do
        expect(investment).to be_nil
      end

      it "return validation errors" do
        expect(subject.errors).to include(
          I18n.t("activerecord.errors.importers.uploads.record_invalid",
            klass_name: "Investment", respondent_id: "118188164108",
            error: "Capital type can't be blank")
        )
      end
    end

    context "when dependency is missing" do
      let(:project) {}

      it "does not create new investment" do
        expect(Investment.count).to be_zero
      end

      it "return validation errors" do
        expect(subject.errors).to include(
          I18n.t("activerecord.errors.importers.uploads.dependency_error",
            klass_name: "Investment", respondent_id: "118188164108",
            error: I18n.t("activerecord.errors.importers.uploads.dependency_not_found",
              klass: "Project", attr: "name", value: "Llama"))
        )
      end
    end
  end
end
