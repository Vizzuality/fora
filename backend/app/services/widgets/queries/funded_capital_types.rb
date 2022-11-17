module Widgets
  module Queries
    class FundedCapitalTypes < Base
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
        @investments ||= Investment.select(:amount, :capital_types).where(year_invested: year).each_with_object({}) do |investment, res|
          investment.capital_types.each do |capital_type|
            res[capital_type] = (res[capital_type] || 0) + (investment.amount / investment.capital_types.size).round
          end
        end
      end
    end
  end
end
