require "rails_helper"

RSpec.describe Importers::Uploads::Funders do
  subject { described_class.new(data, images, []) }

  describe "#call" do
    let(:data) do
      [{
        "Respondent ID" => "114188650913",
        "Collector ID" => "423533945",
        "Start Date" => "11/29/2022 09:56:21 AM",
        "End Date" => "11/29/2022 09:58:53 AM",
        "IP Address" => "148.74.179.249",
        "Organization Name (Public)" => "Armonia LLC",
        "Primary Office Street (Only FORA)" => "Address",
        "Primary Office Country (Public)" => "United Arab Emirates",
        "Primary Office City (Public)" => "Greenwich",
        "Primary Office State (Public)" => "Connecticut",
        "Primary Contact - First Name (Only FORA)" => "Me",
        "Primary Contact - Last Name (Only FORA)" => "You",
        "Primary Contact - Email (Only FORA)" => "me@you.com",
        "Primary Contact - Phone Number (Only FORA)" => "5123006277",
        "Primary Contact Location (City, State | Only FORA)" => "Here",
        "Primary Contact Role (Only FORA)" => "Role",
        "Can primary contact email be displayed on the platform?" => "Yes",
        "If primary contact cannot be displayed on the platform, is there an email that can be shared in the platform (for example, can be an \"info@\" email | Public)?" => "info@armoniallc.com",
        "Description of the Organization (Public)" => "Company",
        "Website: (Format: https://www.sitename.com, orhttp://www.sitename.com) (Public)" => "http://armoniallc.com/",
        "Year Joined FORA (Public)" => "2019",
        "Logo (Public)" => "Logo_Natural_Investments_202022.jpg",
        "Organization Type (Public)" => ["Other (please specify)", "Custom organization type"],
        "Capital Acceptance (Public)" => ["Advises and Manages Capital", "Donations Accepted", "Custom Capital Acceptance"],
        "Leadership Demographic (select all that apply | Aggregated Publicly)" => ["Black or African American", "Indigenous/Tribal Nations"],
        "Staff Employees - Number (Only FORA)" => "3",
        "Funding Application Status (Public)" => ["Invitation only"],
        "Legal Status (Public)" => ["For-profit"],
        "Are you new to regenerative agriculture and, as such, have not yet made any investments or funding in this sector? (Only FORA)" => "Yes",
        "Do you collaborate with other networks/membership organizations? (Public)" => ["Yes", "SAFSF"],
        "Capital Deployed (select all that apply | Public)" => ["Grants", "Debt"],
        "Do you have a spend down strategy? (Public)" => ["Yes"],
        "Areas of interest (not investing in currently but interested in investing in the future | select all that apply | Public)" => ["Agroforestry", "Alternative Proteins", "Custom Area"],
        "Demographic Focus (select all that apply | Public)" => ["Black or African American", "Indigenous/Tribal Nations"],
        "Geographic Focus - Countries (Select all that apply | Alphabetical from A - I, move to next question for J - Z | Public)" => ["Afghanistan"],
        "Geographic Focus - Countries (Select all that apply | alphabetical from J - Z | Public)" => ["Country Not Listed"],
        "Geographic Focus - States (Public)" => ["No state focus, they work nationally"]
      }]
    end
    let(:images) do
      {"114188650913_Logo_Natural_Investments_202022.jpg" => Tempfile.new(["Logo_Natural_Investments_202022.jpg", ".jpg"], binmode: true)}
    end
    let!(:usa_country) { create :subgeographic, geographic: :countries, name: "United States" }
    let!(:afghanistan) { create :subgeographic, geographic: :countries, name: "Afghanistan" }
    let!(:united_arab_emirates) { create :subgeographic, geographic: :countries, name: "United Arab Emirates" }
    let!(:national) { create :subgeographic, geographic: :national, name: "United States", parent: usa_country }
    let!(:connecticut) { create :subgeographic, geographic: :states, name: "Connecticut", parent: usa_country }
    let(:funder) { Funder.last }

    before { subject.call }

    it "creates new funder" do
      expect(funder).to be_present
    end

    it "does not raise any error" do
      expect(subject.errors).to be_empty
    end

    it "assigns correct values to funder attributes" do
      expect(funder.name).to eq("Armonia LLC")
      expect(funder.description).to eq("Company")
      expect(funder.primary_office_address).to eq("Address")
      expect(funder.primary_office_country).to eq(united_arab_emirates)
      expect(funder.primary_office_state).to eq(connecticut)
      expect(funder.primary_office_city).to eq("Greenwich")
      expect(funder.primary_contact_role).to eq("Role")
      expect(funder.primary_contact_first_name).to eq("Me")
      expect(funder.primary_contact_last_name).to eq("You")
      expect(funder.primary_contact_email).to eq("me@you.com")
      expect(funder.primary_contact_phone).to eq("5123006277")
      expect(funder.primary_contact_location).to eq("Here")
      expect(funder.show_primary_email).to be_truthy
      expect(funder.secondary_email_which_can_be_shared).to eq("info@armoniallc.com")
      expect(funder.website).to eq("http://armoniallc.com/")
      expect(funder.new_to_regenerative_ag).to be_truthy
      expect(funder.spend_down_strategy).to be_truthy
      expect(funder.number_staff_employees).to eq(3)
      expect(funder.date_joined_fora).to eq(Date.new(2019))
      expect(funder.networks).to eq("SAFSF")
      expect(funder.funder_type).to eq("other")
      expect(funder.funder_type_other).to eq("Custom organization type")
      expect(funder.capital_acceptances).to match_array(["advises_and_manages_capital", "donations_accepted", "other"])
      expect(funder.capital_acceptances_other).to eq("Custom Capital Acceptance")
      expect(funder.leadership_demographics).to match_array(["black_or_african_american", "indigenous_tribal_nations"])
      expect(funder.leadership_demographics_other).to be_nil
      expect(funder.application_status).to eq("invitation_only")
      expect(funder.funder_legal_status).to eq("for_profit")
      expect(funder.funder_legal_status_other).to be_nil
      expect(funder.capital_types).to match_array(["grants", "debt"])
      expect(funder.capital_types_other).to be_nil
      expect(funder.areas).to match_array(["agroforestry", "alternative_proteins", "other"])
      expect(funder.areas_other).to eq("Custom Area")
      expect(funder.demographics).to match_array(["black_or_african_american", "indigenous_tribal_nations"])
      expect(funder.demographics_other).to be_nil
      expect(funder.subgeographics).to match_array([national, afghanistan])
      expect(funder.logo).to be_attached
      expect(funder.logo.filename).to eq("Logo_Natural_Investments_202022.jpg")
      expect(funder.logo.content_type).to eq("image/jpeg")
    end

    context "when provided data are not valid" do
      let(:data) do
        [{
          "Respondent ID" => "114188650913",
          "Collector ID" => "423533945",
          "Start Date" => "11/29/2022 09:56:21 AM",
          "End Date" => "11/29/2022 09:58:53 AM",
          "IP Address" => "148.74.179.249",
          "Organization Name (Public)" => "Armonia LLC"
        }]
      end

      it "does not create new funder" do
        expect(funder).to be_nil
      end

      it "return validation errors" do
        expect(subject.errors).to include(
          I18n.t("activerecord.errors.importers.uploads.record_invalid",
            klass_name: "Funder", respondent_id: "114188650913",
            error: "Primary office country must exist")
        )
        expect(subject.errors).to include(
          I18n.t("activerecord.errors.importers.uploads.record_invalid",
            klass_name: "Funder", respondent_id: "114188650913",
            error: "Funder type can't be blank")
        )
      end
    end
  end
end
