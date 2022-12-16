require "rails_helper"

RSpec.describe Uploads::ProcessFile do
  subject { described_class.new upload }

  describe "#call" do
    let!(:usa_country) { create :subgeographic, geographic: :countries, name: "United States" }
    let!(:afghanistan) { create :subgeographic, geographic: :countries, name: "Afghanistan" }
    let!(:aruba) { create :subgeographic, geographic: :countries, name: "Aruba" }
    let!(:united_arab_emirates) { create :subgeographic, geographic: :countries, name: "United Arab Emirates" }
    let!(:jamaica) { create :subgeographic, geographic: :countries, name: "Jamaica" }
    let!(:national) { create :subgeographic, geographic: :national, name: "United States", parent: usa_country }
    let!(:connecticut) { create :subgeographic, geographic: :states, name: "Connecticut", parent: usa_country }
    let!(:new_hampshire) { create :subgeographic, geographic: :states, name: "New Hampshire", parent: usa_country }
    let!(:alabama) { create :subgeographic, geographic: :states, name: "Alabama", parent: usa_country }
    let!(:alaska) { create :subgeographic, geographic: :states, name: "Alaska", parent: usa_country }

    before { subject.call }

    context "when provided data are correct" do
      let(:upload) do
        create :upload, file: Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/files/upload.zip"), "application/zip")
      end
      let(:funder_1) { Funder.find_by! name: "11th Hour Project" }
      let(:funder_2) { Funder.find_by! name: "Armonia LLC" }

      it "creates new records" do
        expect(Funder.count).to eq(2)
      end

      it "matches attributes of first funder with data from zip file" do
        expect(funder_1.name).to eq("11th Hour Project")
        expect(funder_1.description).to eq("big organization")
        expect(funder_1.primary_office_address).to eq("Yes")
        expect(funder_1.primary_office_country).to eq(aruba)
        expect(funder_1.primary_office_state).to eq(new_hampshire)
        expect(funder_1.primary_office_city).to eq("Aruba City")
        expect(funder_1.primary_contact_role).to eq("Jester")
        expect(funder_1.primary_contact_first_name).to eq("Kevin")
        expect(funder_1.primary_contact_last_name).to eq("Irby")
        expect(funder_1.primary_contact_email).to eq("kirby@forainitiative.org")
        expect(funder_1.primary_contact_phone).to eq("5123006277")
        expect(funder_1.primary_contact_location).to eq("Austin, Texas")
        expect(funder_1.show_primary_email).to be_truthy
        expect(funder_1.secondary_email_which_can_be_shared).to eq("hi@yay.org")
        expect(funder_1.website).to eq("https://www.hi.com")
        expect(funder_1.new_to_regenerative_ag).to be_falsey
        expect(funder_1.spend_down_strategy).to be_truthy
        expect(funder_1.number_staff_employees).to eq(500)
        expect(funder_1.date_joined_fora).to eq(Date.new(2022))
        expect(funder_1.networks).to eq("Everyone")
        expect(funder_1.funder_type).to eq("individual")
        expect(funder_1.funder_type_other).to be_nil
        expect(funder_1.capital_acceptances).to match_array(["advises_and_manages_capital", "donations_accepted", "does_not_provide_funding"])
        expect(funder_1.capital_acceptances_other).to be_nil
        expect(funder_1.leadership_demographics).to match_array(["black_or_african_american", "asian"])
        expect(funder_1.leadership_demographics_other).to be_nil
        expect(funder_1.application_status).to eq("invitation_only")
        expect(funder_1.funder_legal_status).to eq("non_profit")
        expect(funder_1.funder_legal_status_other).to be_nil
        expect(funder_1.capital_types).to match_array(["debt", "equity", "pris"])
        expect(funder_1.capital_types_other).to be_nil
        expect(funder_1.areas).to match_array(["agroforestry", "animal_welfare"])
        expect(funder_1.areas_other).to be_nil
        expect(funder_1.demographics).to match_array(["black_or_african_american"])
        expect(funder_1.demographics_other).to be_nil
        expect(funder_1.subgeographics).to match_array([jamaica, alabama, alaska])
        expect(funder_1.logo).to be_attached
        expect(funder_1.logo.filename).to eq("Logo_ Nature Vest - 2022 (1).jpg")
        expect(funder_1.logo.content_type).to eq("image/jpeg")
      end

      it "matches attributes of second funder with data from zip file" do
        expect(funder_2.name).to eq("Armonia LLC")
        expect(funder_2.description).to eq("Company")
        expect(funder_2.primary_office_address).to eq("xyz")
        expect(funder_2.primary_office_country).to eq(united_arab_emirates)
        expect(funder_2.primary_office_state).to eq(connecticut)
        expect(funder_2.primary_office_city).to eq("Greenwich")
        expect(funder_2.primary_contact_role).to eq("yes")
        expect(funder_2.primary_contact_first_name).to eq("Me")
        expect(funder_2.primary_contact_last_name).to eq("You")
        expect(funder_2.primary_contact_email).to eq("me@you.com")
        expect(funder_2.primary_contact_phone).to eq("5123006277")
        expect(funder_2.primary_contact_location).to eq("Here")
        expect(funder_2.show_primary_email).to be_truthy
        expect(funder_2.secondary_email_which_can_be_shared).to eq("info@armoniallc.com")
        expect(funder_2.website).to eq("http://armoniallc.com/")
        expect(funder_2.new_to_regenerative_ag).to be_truthy
        expect(funder_2.spend_down_strategy).to be_truthy
        expect(funder_2.number_staff_employees).to eq(3)
        expect(funder_2.date_joined_fora).to eq(Date.new(2019))
        expect(funder_2.networks).to eq("SAFSF")
        expect(funder_2.funder_type).to eq("accelerator")
        expect(funder_2.funder_type_other).to be_nil
        expect(funder_2.capital_acceptances).to match_array(["advises_and_manages_capital", "donations_accepted"])
        expect(funder_2.capital_acceptances_other).to be_nil
        expect(funder_2.leadership_demographics).to match_array(["black_or_african_american", "indigenous_tribal_nations"])
        expect(funder_2.leadership_demographics_other).to be_nil
        expect(funder_2.application_status).to eq("invitation_only")
        expect(funder_2.funder_legal_status).to eq("for_profit")
        expect(funder_2.funder_legal_status_other).to be_nil
        expect(funder_2.capital_types).to match_array(["grants", "debt"])
        expect(funder_2.capital_types_other).to be_nil
        expect(funder_2.areas).to match_array(["agroforestry", "alternative_proteins"])
        expect(funder_2.areas_other).to be_nil
        expect(funder_2.demographics).to match_array(["black_or_african_american", "indigenous_tribal_nations"])
        expect(funder_2.demographics_other).to be_nil
        expect(funder_2.subgeographics).to match_array([national, afghanistan])
        expect(funder_2.logo).to be_attached
        expect(funder_2.logo.filename.to_s).to eq("Logo_ Natural Investments LLC - 2022.jpg")
        expect(funder_2.logo.content_type).to eq("image/jpeg")
      end
    end

    context "when provided data are wrong" do
      let(:upload) do
        create :upload, file: Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/files/upload_wrong.zip"), "application/zip")
      end

      it "does not creates any new records" do
        expect(Funder.count).to be_zero
      end

      it "keeps errors" do
        expect(subject.errors).to include(
          I18n.t("activerecord.errors.importers.uploads.record_invalid",
            klass_name: "Funder", respondent_id: "114188650913",
            error: "Primary office country must exist")
        )
      end
    end
  end
end
