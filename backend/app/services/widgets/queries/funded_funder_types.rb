module Widgets
  module Queries
    class FundedFunderTypes < Base
      private

      def headers
        [
          {label: I18n.t("widgets.headers.funded_funder_types.organization_type"), value: :funder_type},
          {label: I18n.t("widgets.headers.common.values"), value: :values}
        ]
      end

      def values
        FunderType.all.sort_by(&:name).map do |funder_type|
          [
            {id: funder_type.id, value: funder_type.name},
            {value: (investments[funder_type.id] || 0).to_f}
          ]
        end
      end

      def investments
        @investments ||= Investment.where(year_invested: year).joins(:funder).group("funders.funder_type").sum(:amount)
      end
    end
  end
end
