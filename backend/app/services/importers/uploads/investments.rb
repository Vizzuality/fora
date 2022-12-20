module Importers
  module Uploads
    class Investments < Base
      COLUMNS = {
        respondent_id: "Respondent ID",
        submitting_organization: "Submitting Organization Name (Public)",
        submitting_organization_contact_name: "Submitting Organization Contact Name (First and Last | Only FORA)",
        name_existing: "Partner Organization Name (Public). If the organization's name is in the dropdown, choose it and you may jump to Question 20. If not, please choose \"Organization Not Listed\" and continue with the questions.",
        name: "Partner Organization Name (Public)",
        privacy: "Privacy: Can this funding information be shared on the platform?",
        amount: "Amount Funded",
        year_invested: "Year of Investment",
        initial_funded_year: "Initial Year Funded",
        capital_type: "Capital Type",
        funding_type: "Funding Type (if a grant)",
        grant_duration: "Duration of Grant/Investment",
        number_of_grant_years: "If Multi-Year, Number of Years",
        areas: "Areas of focus for this funding (select all that apply)",
        demographics: "If yes, what is the demographic focus of this partner organization? (select all that apply | Public)",
        geographic_countries_first_part: "Geographic Focus - Countries (Select all that apply | alphabetical from A - I, move to next question for J - Z | Public)",
        geographic_countries_second_part: "Geographic Focus - Countries (Select all that apply | alphabetical from J - Z] | Public)",
        geographic_states: "Geographic Focus - States (Public)"
      }.freeze

      private

      def create_with!(attr)
        investment = Investment.new project_id: project_id_for(attr), funder_id: funder_id_for(attr)
        fix_capital_type_options attr # TODO: Remove when bug at surveymonkey form is fixed
        assign_simple_columns_to investment, attr
        assign_enums_to investment, attr
        assign_subgeographics_to investment, attr
        investment.save!
      end

      def assign_simple_columns_to(investment, attr)
        investment.assign_attributes amount: simple_column_for(:amount, attr).to_f,
          submitting_organization_contact_name: simple_column_for(:submitting_organization_contact_name, attr),
          year_invested: simple_column_for(:year_invested, attr).to_i,
          initial_funded_year: simple_column_for(:initial_funded_year, attr).to_i,
          number_of_grant_years: simple_column_for(:number_of_grant_years, attr).to_i
      end

      def assign_enums_to(investment, attr)
        assign_enum_to investment, :privacy, InvestmentPrivacy, attr
        assign_enum_to investment, :capital_type, CapitalType, attr
        assign_enum_to investment, :funding_type, FundingType, attr
        assign_enum_to investment, :grant_duration, GrantDuration, attr
        assign_enum_to investment, :areas, Area, attr
        assign_enum_to investment, :demographics, Demographic, attr
      end

      def project_id_for(attr)
        project_name = simple_column_for(:name, attr).presence || simple_column_for(:name_existing, attr)
        return projects[project_name].first.id if projects.key? project_name

        raise ActiveRecord::RecordNotFound,
          I18n.t("activerecord.errors.importers.uploads.dependency_not_found", klass: "Project", attr: "name", value: project_name)
      end

      def funder_id_for(attr)
        funder_name = simple_column_for :submitting_organization, attr
        return funders[funder_name].first.id if funders.key? funder_name

        raise ActiveRecord::RecordNotFound,
          I18n.t("activerecord.errors.importers.uploads.dependency_not_found", klass: "Funder", attr: "name", value: funder_name)
      end

      def projects
        @projects ||= Project.joins(:recipient).select("projects.id, recipients.name as recipient_name").group_by(&:recipient_name)
      end

      def funders
        @funders ||= Funder.select(:id, :name).group_by(&:name)
      end

      def fix_capital_type_options(attr)
        fixes = {"Grant" => "Grants", "Re-grant" => "Re-grants", "Forgivable loan" => "Forgivable loans"}
        value = simple_column_for :capital_type, attr
        return unless fixes.key? value

        attr[COLUMNS[:capital_type]] = fixes[value]
      end
    end
  end
end
