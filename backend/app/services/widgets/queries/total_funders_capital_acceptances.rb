module Widgets
  module Queries
    class TotalFundersCapitalAcceptances < Base
      private

      def headers
        [
          {label: I18n.t("activerecord.models.capital_acceptance.one"), value: :capital_acceptance},
          {label: I18n.t("widgets.headers.common.values"), value: :values}
        ]
      end

      def values
        CapitalAcceptance.all.sort_by(&:name).map do |capital_acceptance|
          [
            {id: capital_acceptance.id, value: capital_acceptance.name},
            {value: (funders[capital_acceptance.id] || 0).to_f}
          ]
        end
      end

      def funders
        @funders ||= Funder.where(date_joined_fora: ..DateTime.new(year).end_of_year).group("unnest(capital_acceptances)").count
      end
    end
  end
end
