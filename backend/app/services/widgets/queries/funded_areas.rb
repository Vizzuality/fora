module Widgets
  module Queries
    class FundedAreas < Base
      private

      def headers
        [
          {label: I18n.t("activerecord.models.area.one"), value: :area_of_focus},
          {label: I18n.t("widgets.headers.common.funded_with"), value: :funded_with}
        ]
      end

      def values
        Area.all.sort_by(&:name).map do |area|
          [
            {id: area.id, value: area.name},
            {value: (investments[area.id] || 0).to_f}
          ]
        end
      end

      def investments
        @investments ||= Investment.can_show_aggregated_amount.select(:amount, :areas).where(year_invested: year)
          .each_with_object({}) do |investment, res|
          investment.areas.each do |investment_area|
            res[investment_area] = (res[investment_area] || 0) + (investment.amount / investment.areas.size).round
          end
        end
      end
    end
  end
end
