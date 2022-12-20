module Widgets
  module Queries
    class TotalFundersCapitalTypes < Base
      private

      def headers
        [
          {label: I18n.t("activerecord.models.capital_type.one"), value: :capital_type},
          {label: I18n.t("widgets.headers.common.values"), value: :values}
        ]
      end

      def values
        CapitalType.all.sort_by(&:name).map do |capital_type|
          [
            {id: capital_type.id, value: capital_type.name},
            {value: (investments[capital_type.id] || 0).to_f}
          ]
        end
      end

      def investments
        @investments = Investment.where(year_invested: year).group("capital_type").count("DISTINCT investments.funder_id")
      end
    end
  end
end
