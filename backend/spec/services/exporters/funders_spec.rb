require "rails_helper"

RSpec.describe Exporters::Funders do
  subject { described_class.new(query) }

  before do
    create_list :funder, 4
  end

  let(:query) { Funder.all.order(:created_at) }
  let(:parsed_csv) { CSV.parse(subject.call) }

  describe "#call" do
    it "has correct headers at csv" do
      expect(parsed_csv.first).to eq([
        I18n.t("activerecord.attributes.funder.id"),
        I18n.t("activerecord.attributes.funder.name"),
        I18n.t("activerecord.attributes.funder.description"),
        I18n.t("activerecord.attributes.funder.primary_office_country"),
        I18n.t("activerecord.attributes.funder.primary_office_state"),
        I18n.t("activerecord.attributes.funder.primary_office_city"),
        I18n.t("activerecord.attributes.funder.primary_office_address"),
        I18n.t("activerecord.attributes.funder.primary_contact_first_name"),
        I18n.t("activerecord.attributes.funder.primary_contact_last_name"),
        I18n.t("activerecord.attributes.funder.primary_contact_email"),
        I18n.t("activerecord.attributes.funder.show_primary_email"),
        I18n.t("activerecord.attributes.funder.primary_contact_phone"),
        I18n.t("activerecord.attributes.funder.primary_contact_location"),
        I18n.t("activerecord.attributes.funder.primary_contact_role"),
        I18n.t("activerecord.attributes.funder.secondary_email_which_can_be_shared"),
        I18n.t("activerecord.attributes.funder.website"),
        I18n.t("activerecord.attributes.funder.date_joined_fora"),
        I18n.t("activerecord.attributes.funder.funder_type"),
        I18n.t("activerecord.attributes.funder.funder_type_other"),
        I18n.t("activerecord.attributes.funder.capital_acceptances"),
        I18n.t("activerecord.attributes.funder.capital_acceptances_other"),
        I18n.t("activerecord.attributes.funder.leadership_demographics"),
        I18n.t("activerecord.attributes.funder.leadership_demographics_other"),
        I18n.t("activerecord.attributes.funder.number_staff_employees"),
        I18n.t("activerecord.attributes.funder.application_status"),
        I18n.t("activerecord.attributes.funder.funder_legal_status"),
        I18n.t("activerecord.attributes.funder.funder_legal_status_other"),
        I18n.t("activerecord.attributes.funder.new_to_regenerative_ag"),
        I18n.t("activerecord.attributes.funder.networks"),
        I18n.t("activerecord.attributes.funder.capital_types"),
        I18n.t("activerecord.attributes.funder.capital_types_other"),
        I18n.t("activerecord.attributes.funder.spend_down_strategy"),
        I18n.t("activerecord.attributes.funder.areas"),
        I18n.t("activerecord.attributes.funder.areas_other"),
        I18n.t("activerecord.attributes.funder.demographics"),
        I18n.t("activerecord.attributes.funder.demographics_other"),
        I18n.t("activerecord.attributes.funder.created_at"),
        I18n.t("activerecord.attributes.funder.updated_at")
      ])
    end

    it "has correct data at csv" do
      expect(parsed_csv.size).to eq(query.count + 1)
      expect(parsed_csv.second).to eq([
        query.first.id.to_s,
        query.first.name,
        query.first.description,
        query.first.primary_office_country&.name,
        query.first.primary_office_state&.name,
        query.first.primary_office_city,
        query.first.primary_office_address,
        query.first.primary_contact_first_name,
        query.first.primary_contact_last_name,
        query.first.primary_contact_email,
        I18n.t(query.first.show_primary_email),
        query.first.primary_contact_phone,
        query.first.primary_contact_location,
        query.first.primary_contact_role,
        query.first.secondary_email_which_can_be_shared,
        query.first.website,
        I18n.l(query.first.date_joined_fora),
        FunderType.find(query.first.funder_type)&.name,
        query.first.funder_type_other,
        CapitalAcceptance.find_many(query.first.capital_acceptances).map(&:name).join(", "),
        query.first.capital_acceptances_other,
        Demographic.find_many(query.first.leadership_demographics).map(&:name).join(", "),
        query.first.leadership_demographics_other,
        query.first.number_staff_employees.to_s,
        ApplicationStatus.find(query.first.application_status)&.name,
        FunderLegalStatus.find(query.first.funder_legal_status)&.name,
        query.first.funder_legal_status_other,
        I18n.t(query.first.new_to_regenerative_ag),
        query.first.networks,
        CapitalType.find_many(query.first.capital_types).map(&:name).join(", "),
        query.first.capital_types_other,
        I18n.t(query.first.spend_down_strategy),
        Area.find_many(query.first.areas).map(&:name).join(", "),
        query.first.areas_other,
        Demographic.find_many(query.first.demographics).map(&:name).join(", "),
        query.first.demographics_other,
        I18n.l(query.first.created_at),
        I18n.l(query.first.updated_at)
      ])
    end
  end
end
