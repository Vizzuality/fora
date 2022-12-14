module Widgets
  module Queries
    class TotalFundersDemographics < Base
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
        @investments ||= Investment.can_be_shown_without_amount.joins(:funder).where(funders: {date_joined_fora: ..DateTime.new(year).end_of_year})
          .group("unnest(investments.demographics)").count("DISTINCT investments.funder_id")
      end
    end
  end
end
