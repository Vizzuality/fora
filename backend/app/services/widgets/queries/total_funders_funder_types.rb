module Widgets
  module Queries
    class TotalFundersFunderTypes < Base
      private

      def headers
        [
          {label: I18n.t("activerecord.models.funder_type.one"), value: :funder_type},
          {label: I18n.t("widgets.headers.common.values"), value: :values}
        ]
      end

      def values
        FunderType.all.sort_by(&:name).map do |funder_type|
          [
            {id: funder_type.id, value: funder_type.name},
            {value: (funders[funder_type.id] || 0).to_f}
          ]
        end
      end

      def funders
        @funders ||= Investment.can_be_shown_without_amount.joins(:funder).where(year_invested: year)
          .group("funders.funder_type").count("DISTINCT funders.id")
      end
    end
  end
end
