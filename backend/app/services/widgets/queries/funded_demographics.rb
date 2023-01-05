module Widgets
  module Queries
    class FundedDemographics < Base
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
        @investments ||= Investment.can_show_aggregated_amount.select(:amount, :demographics).where(year_invested: year)
          .each_with_object({}) do |investment, res|
          investment.demographics.each do |demographic|
            res[demographic] = (res[demographic] || 0) + (investment.amount / investment.demographics.size).round
          end
        end
      end
    end
  end
end
