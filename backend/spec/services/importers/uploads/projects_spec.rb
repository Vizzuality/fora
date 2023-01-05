require "rails_helper"

RSpec.describe Importers::Uploads::Projects do
  subject { described_class.new(data, images, []) }

  describe "#call" do
    let(:recipient) { Recipient.last }

    context "when creating new project" do
      let(:data) do
        [{
          "Respondent ID" => "118188164108",
          "Partner Organization Name (Public). If the organization's name is in the dropdown, choose it and you may jump to Question 20. If not, please choose \"Organization Not Listed\" and continue with the questions." => "Organization Not Listed",
          "Partner Organization Name (Public)" => "Llama",
          "Description of the Organization (Public)" => "Hairy",
          "Logo (Public)" => "Logo_NaturalInvestmentLLC-2022.jpg",
          "Primary Contact - First Name (Only FORA)" => "Me",
          "Primary Contact - Last Name (Only FORA)" => "Me II",
          "Website: (Format: https://www.sitename.com, orhttp://www.sitename.com) (Public)" => "https://forainitiative.org/",
          "Primary Office Country (Public)" => "New Caledonia",
          "Primary Office State (Public)" => "District of Columbia",
          "Primary Office City (Public)" => "Austin",
          "Do you collect information on the leadership demographics of partner organizations?" => "Yes",
          "If yes, what is the leadership demographic of this partner organization? (select all that apply | Public)" => ["Black or African American", "Indigenous/Tribal Nations"],
          "Legal Status (Public)" => "For-profit"
        }]
      end
      let(:images) do
        {"118188164108_Logo_NaturalInvestmentLLC-2022.jpg" => Tempfile.new(["Logo_NaturalInvestmentLLC-2022.jpg", ".jpg"], binmode: true)}
      end
      let!(:usa_country) { create :subgeographic, geographic: :countries, name: "United States" }
      let!(:new_caledonia) { create :subgeographic, geographic: :countries, name: "New Caledonia" }
      let!(:columbia) { create :subgeographic, geographic: :states, name: "District of Columbia", parent: usa_country }

      before { subject.call }

      it "creates new recipient with project" do
        expect(recipient).to be_present
        expect(recipient.project).to be_present
      end

      it "does not raise any error" do
        expect(subject.errors).to be_empty
      end

      it "assigns correct values to recipient attributes" do
        expect(recipient.name).to eq("Llama")
        expect(recipient.description).to eq("Hairy")
        expect(recipient.contact_first_name).to eq("Me")
        expect(recipient.contact_last_name).to eq("Me II")
        expect(recipient.website).to eq("https://forainitiative.org/")
        expect(recipient.country).to eq(new_caledonia)
        expect(recipient.state).to eq(columbia)
        expect(recipient.city).to eq("Austin")
        expect(recipient.leadership_demographics).to match_array(["black_or_african_american", "indigenous_tribal_nations"])
        expect(recipient.leadership_demographics_other).to be_nil
        expect(recipient.recipient_legal_status).to eq("for_profit")
        expect(recipient.logo).to be_attached
        expect(recipient.logo.filename).to eq("Logo_NaturalInvestmentLLC-2022.jpg")
        expect(recipient.logo.content_type).to eq("image/jpeg")
      end
    end

    context "when using already existing recipient" do
      let!(:recipient) { create :recipient }
      let(:data) do
        [{
          "Respondent ID" => "118188164108",
          "Partner Organization Name (Public). If the organization's name is in the dropdown, choose it and you may jump to Question 20. If not, please choose \"Organization Not Listed\" and continue with the questions." => recipient.name
        }]
      end
      let(:images) { {} }

      it "does not create any new recipient" do
        expect {
          subject.call
        }.not_to change(Recipient, :count)
      end

      it "does not raise any error" do
        subject.call
        expect(subject.errors).to be_empty
      end
    end

    context "when provided data are not valid" do
      let(:data) do
        [{
          "Respondent ID" => "118188164108",
          "Partner Organization Name (Public)" => "Llama"
        }]
      end
      let(:images) { {} }

      before { subject.call }

      it "does not create new funder" do
        expect(recipient).to be_nil
      end

      it "return validation errors" do
        expect(subject.errors).to include(
          I18n.t("activerecord.errors.importers.uploads.record_invalid",
            klass_name: "Project", respondent_id: "118188164108",
            error: "Country must exist")
        )
        expect(subject.errors).to include(
          I18n.t("activerecord.errors.importers.uploads.record_invalid",
            klass_name: "Project", respondent_id: "118188164108",
            error: "Recipient legal status can't be blank")
        )
      end
    end
  end
end
