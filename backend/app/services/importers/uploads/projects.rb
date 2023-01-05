module Importers
  module Uploads
    class Projects < Base
      COLUMNS = {
        respondent_id: "Respondent ID",
        name_existing: "Partner Organization Name (Public). If the organization's name is in the dropdown, choose it and you may jump to Question 20. If not, please choose \"Organization Not Listed\" and continue with the questions.",
        name: "Partner Organization Name (Public)",
        description: "Description of the Organization (Public)",
        logo: "Logo (Public)",
        contact_first_name: "Primary Contact - First Name (Only FORA)",
        contact_last_name: "Primary Contact - Last Name (Only FORA)",
        website: "Website: (Format: https://www.sitename.com, orhttp://www.sitename.com) (Public)",
        country: "Primary Office Country (Public)",
        state: "Primary Office State (Public)",
        city: "Primary Office City (Public)",
        leadership_demographics: "If yes, what is the leadership demographic of this partner organization? (select all that apply | Public)",
        recipient_legal_status: "Legal Status (Public)"
      }.freeze
      NOT_LISTED_ORGANIZATION = "Organization Not Listed"

      private

      def create_with!(attr)
        return if exists? attr

        recipient = Recipient.includes(:project).find_or_initialize_by name: simple_column_for(:name, attr)
        assign_simple_columns_to recipient, attr
        assign_enums_to recipient, attr
        assign_logo_to recipient, attr
        assign_project_to recipient
        recipient.save!
      end

      def assign_simple_columns_to(recipient, attr)
        recipient.assign_attributes name: simple_column_for(:name, attr),
          description: simple_column_for(:description, attr),
          contact_first_name: simple_column_for(:contact_first_name, attr),
          contact_last_name: simple_column_for(:contact_last_name, attr),
          website: simple_column_for(:website, attr),
          country_id: subgeographics.dig(:countries, simple_column_for(:country, attr)),
          state_id: subgeographics.dig(:states, simple_column_for(:state, attr)),
          city: simple_column_for(:city, attr)
      end

      def assign_enums_to(recipient, attr)
        assign_enum_to recipient, :leadership_demographics, Demographic, attr
        assign_enum_to recipient, :recipient_legal_status, RecipientLegalStatus, attr
      end

      def assign_project_to(recipient)
        return if recipient.project.present?

        recipient.build_project
      end

      def exists?(attr)
        simple_column_for(:name_existing, attr).present? &&
          simple_column_for(:name_existing, attr) != NOT_LISTED_ORGANIZATION
      end
    end
  end
end
