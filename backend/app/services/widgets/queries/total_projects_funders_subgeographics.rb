module Widgets
  module Queries
    class TotalProjectsFundersSubgeographics < Base
      register_filters :geographic

      def initialize(year, filters = {})
        @year = year
        @geographic = Geographic::TYPES.include?(filters[:geographic]) ? filters[:geographic] : "countries"
      end

      def enabled_cache?
        true
      end

      def cache_key
        "geographic=#{geographic}"
      end

      private

      def headers
        [
          {label: Geographic.find(geographic).name, value: :geographic},
          {label: I18n.t("widgets.headers.total_projects_funders_areas.total_projects"), value: :total_projects},
          {label: I18n.t("widgets.headers.total_projects_funders_areas.total_funders"), value: :total_funders}
        ]
      end

      def values
        subgeographics.sort_by(&:name).map do |subgeographic|
          [
            {id: subgeographic.id, value: subgeographic.name},
            {value: (total_projects[subgeographic.id] || 0).to_f},
            {value: (total_funders[subgeographic.id] || 0).to_f}
          ]
        end
      end

      def total_projects
        @total_projects ||= Investment.can_be_shown_without_amount.where(year_invested: 2021).joins(:subgeographic_ancestors)
          .group("ancestor_id").count("DISTINCT investments.project_id")
      end

      def total_funders
        @total_funders ||= Funder.where(date_joined_fora: ..DateTime.new(year).end_of_year).joins(:subgeographic_ancestors)
          .group("ancestor_id").count
      end

      def subgeographics
        @subgeographics ||= begin
          subgeographics = Subgeographic.select(:id, :name).where geographic: geographic
          subgeographics = subgeographics.only_active if geographic == "countries"
          subgeographics.to_a
        end
      end
    end
  end
end
