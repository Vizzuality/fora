module Widgets
  module Queries
    class TotalProjectsFundersAreas < Base
      private

      def headers
        [
          {label: I18n.t("activerecord.models.area.one"), value: :area_of_focus},
          {label: I18n.t("widgets.headers.total_projects_funders_areas.total_projects"), value: :total_projects},
          {label: I18n.t("widgets.headers.total_projects_funders_areas.total_funders"), value: :total_funders}
        ]
      end

      def values
        Area.all.sort_by(&:name).map do |area|
          [
            {id: area.id, value: area.name},
            {value: (total_projects[area.id] || 0).to_f},
            {value: (total_funders[area.id] || 0).to_f}
          ]
        end
      end

      def total_projects
        @total_projects ||= Investment.can_be_shown_without_amount.where(year_invested: year)
          .group("unnest(areas)").count("DISTINCT investments.project_id")
      end

      def total_funders
        @total_funders ||= Investment.can_be_shown_without_amount.where(year_invested: year)
          .group("unnest(areas)").count("DISTINCT investments.funder_id")
      end
    end
  end
end
