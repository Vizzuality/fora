module Importers
  module Uploads
    class Funders < Base
      COLUMNS = {
        respondent_id: "Respondent ID",
        name: "Organization Name (Public)",
        primary_office_address: "Primary Office Street (Only FORA)",
        primary_office_country: "Primary Office Country (Public)",
        primary_office_state: "Primary Office State (Public)",
        primary_office_city: "Primary Office City (Public)",
        primary_contact_first_name: "Primary Contact - First Name (Only FORA)",
        primary_contact_last_name: "Primary Contact - Last Name (Only FORA)",
        primary_contact_email: "Primary Contact - Email (Only FORA)",
        primary_contact_phone: "Primary Contact - Phone Number (Only FORA)",
        primary_contact_location: "Primary Contact Location (City, State | Only FORA)",
        primary_contact_role: "Primary Contact Role (Only FORA)",
        show_primary_email: "Can primary contact email be displayed on the platform?",
        secondary_email_which_can_be_shared: "If primary contact cannot be displayed on the platform, is there an email that can be shared in the platform (for example, can be an \"info@\" email | Public)?",
        description: "Description of the Organization (Public)",
        website: "Website: (Format: https://www.sitename.com, orhttp://www.sitename.com) (Public)",
        date_joined_fora: "Year Joined FORA (Public)",
        logo: "Logo (Public)",
        funder_type: "Organization Type (Public)",
        capital_acceptances: "Capital Acceptance (Public)",
        leadership_demographics: "Leadership Demographic (select all that apply | Aggregated Publicly)",
        number_staff_employees: "Staff Employees - Number (Only FORA)",
        application_status: "Funding Application Status (Public)",
        funder_legal_status: "Legal Status (Public)",
        new_to_regenerative_ag: "Are you new to regenerative agriculture and, as such, have not yet made any investments or funding in this sector? (Only FORA)",
        networks: "Do you collaborate with other networks/membership organizations? (Public)",
        capital_types: "Capital Deployed (select all that apply | Public)",
        spend_down_strategy: "Do you have a spend down strategy? (Public)",
        areas: "Areas of interest (not investing in currently but interested in investing in the future | select all that apply | Public)",
        demographics: "Demographic Focus (select all that apply | Public)",
        geographic_countries_first_part: "Geographic Focus - Countries (Select all that apply | Alphabetical from A - I, move to next question for J - Z | Public)",
        geographic_countries_second_part: "Geographic Focus - Countries (Select all that apply | alphabetical from J - Z | Public)",
        geographic_states: "Geographic Focus - States (Public)"
      }.freeze

      private

      def create_with!(attr)
        funder = Funder.find_or_initialize_by name: simple_column_for(:name, attr)
        assign_simple_columns_to funder, attr
        assign_enums_to funder, attr
        assign_subgeographics_to funder, attr
        assign_networks_to funder, attr
        assign_logo_to funder, attr
        funder.save!
      end

      def assign_simple_columns_to(funder, attr)
        funder.assign_attributes name: simple_column_for(:name, attr),
          description: simple_column_for(:description, attr),
          primary_office_address: simple_column_for(:primary_office_address, attr),
          primary_office_country_id: subgeographics.dig(:countries, simple_column_for(:primary_office_country, attr)),
          primary_office_state_id: subgeographics.dig(:states, simple_column_for(:primary_office_state, attr)),
          primary_office_city: simple_column_for(:primary_office_city, attr),
          primary_contact_role: simple_column_for(:primary_contact_role, attr),
          primary_contact_first_name: simple_column_for(:primary_contact_first_name, attr),
          primary_contact_last_name: simple_column_for(:primary_contact_last_name, attr),
          primary_contact_email: simple_column_for(:primary_contact_email, attr),
          primary_contact_phone: simple_column_for(:primary_contact_phone, attr),
          primary_contact_location: simple_column_for(:primary_contact_location, attr),
          show_primary_email: boolean_column_for(:show_primary_email, attr),
          secondary_email_which_can_be_shared: simple_column_for(:secondary_email_which_can_be_shared, attr),
          website: simple_column_for(:website, attr),
          new_to_regenerative_ag: boolean_column_for(:new_to_regenerative_ag, attr),
          spend_down_strategy: boolean_column_for(:spend_down_strategy, attr),
          number_staff_employees: simple_column_for(:number_staff_employees, attr).to_i,
          date_joined_fora: Date.new(simple_column_for(:date_joined_fora, attr).to_i)
      end

      def assign_enums_to(funder, attr)
        assign_enum_to funder, :funder_type, FunderType, attr
        assign_enum_to funder, :capital_acceptances, CapitalAcceptance, attr
        assign_enum_to funder, :leadership_demographics, Demographic, attr
        assign_enum_to funder, :application_status, ApplicationStatus, attr
        assign_enum_to funder, :funder_legal_status, FunderLegalStatus, attr
        assign_enum_to funder, :capital_types, CapitalType, attr
        assign_enum_to funder, :areas, Area, attr
        assign_enum_to funder, :demographics, Demographic, attr
      end

      def assign_networks_to(funder, attr)
        networks = attr[column_name_for(:networks)].to_a
        return unless networks.first.to_s.downcase == "yes"

        funder.networks = networks.last
      end
    end
  end
end
