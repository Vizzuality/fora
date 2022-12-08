module Widgets
  module Queries
    class TotalProjectsDemographics < Base
      private

      def headers
        [
          {label: I18n.t("activerecord.models.demographic.one"), value: :demographic},
          {label: I18n.t("widgets.headers.common.values"), value: :values}
        ]
      end

      def values
        Demographic.all.sort_by(&:name).map do |demographic|
          [
            {id: demographic.id, value: demographic.name},
            {value: (investments[demographic.id] || 0).to_f}
          ]
        end
      end

      def investments
        @investments ||= Investment.where(year_invested: year).group("unnest(demographics)")
          .count("DISTINCT investments.project_id")
      end
    end
  end
end
