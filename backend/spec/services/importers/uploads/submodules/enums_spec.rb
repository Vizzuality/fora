require "rails_helper"

class DummyEnumsModule < Importers::Uploads::Base
  COLUMNS = {
    respondent_id: "Respondent ID",
    application_status: "Funding Application Status (Public)",
    capital_acceptances: "Capital Acceptance (Public)"
  }.freeze

  private

  def create_with!(attr)
    funder = FactoryBot.build :funder, application_status: nil, capital_acceptances: [], capital_acceptances_other: nil
    assign_enum_to funder, :application_status, ApplicationStatus, attr
    assign_enum_to funder, :capital_acceptances, CapitalAcceptance, attr
    funder.save!
  end
end

RSpec.describe DummyEnumsModule do
  subject { described_class.new data, {}, [] }

  describe "#call - assigns properly enum values" do
    let(:application_status) { ApplicationStatus.find("invitation_only").to_s }
    let(:capital_acceptances) do
      [
        CapitalAcceptance.find("advises_and_manages_capital").to_s,
        CapitalAcceptance.find("does_not_provide_funding").to_s
      ]
    end
    let(:capital_acceptances_other) { "Custom capital acceptance" }
    let(:respondent_id) { "123" }
    let(:data) do
      [{
        "Respondent ID" => respondent_id,
        "Funding Application Status (Public)" => application_status,
        "Capital Acceptance (Public)" => capital_acceptances + [capital_acceptances_other]
      }]
    end
    let(:record) { Funder.last }

    before { subject.call }

    context "when provided data are correct" do
      it "assigns correct value to string enum attribute" do
        expect(record.application_status).to eq(ApplicationStatus.find_by_name(application_status).id)
      end

      it "assigns correct values to array enum attribute" do
        expect(record.capital_acceptances.size).to eq(3)
        expect(record.capital_acceptances).to include(CapitalAcceptance.find_by_name(capital_acceptances.first).id)
        expect(record.capital_acceptances).to include(CapitalAcceptance.find_by_name(capital_acceptances.second).id)
        expect(record.capital_acceptances).to include("other")
      end

      it "assigns correct value to other attribute" do
        expect(record.capital_acceptances_other).to eq(capital_acceptances_other)
      end
    end

    context "when enum without other option is assigned unknown value" do
      let(:application_status) { "Custom application status" }

      it "does not create new record" do
        expect(record).to be_nil
      end

      it "returns error informing user what went wrong" do
        expect(subject.errors.first).to eq(
          I18n.t("activerecord.errors.importers.uploads.enum_error",
            klass_name: described_class, respondent_id: respondent_id,
            error: I18n.t("activerecord.errors.importers.uploads.unknown_enum", key: :application_status, values: application_status))
        )
      end
    end

    context "when multiple values is assigned to attribute which is not array" do
      let(:application_status) do
        [ApplicationStatus.find("invitation_only").to_s, ApplicationStatus.find("does_not_provide_funding").to_s]
      end

      it "does not create new record" do
        expect(record).to be_nil
      end

      it "returns error informing user what went wrong" do
        expect(subject.errors.first).to eq(
          I18n.t("activerecord.errors.importers.uploads.enum_error",
            klass_name: described_class, respondent_id: respondent_id,
            error: I18n.t("activerecord.errors.importers.uploads.multiple_values", key: :application_status))
        )
      end
    end

    context "when multiple unknown values is assigned to attribute which supports other option" do
      let(:capital_acceptances) { ["Custom capital acceptance 1"] }
      let(:capital_acceptances_other) { "Custom capital acceptance 2" }

      it "does not create new record" do
        expect(record).to be_nil
      end

      it "returns error informing user what went wrong" do
        expect(subject.errors.first).to eq(
          I18n.t("activerecord.errors.importers.uploads.enum_error",
            klass_name: described_class, respondent_id: respondent_id,
            error: I18n.t("activerecord.errors.importers.uploads.multiple_other_enums",
              key: :capital_acceptances,
              values: (capital_acceptances + [capital_acceptances_other]).join(",")))
        )
      end
    end
  end
end
