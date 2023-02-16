module Widgets
  module Queries
    class FundedSubgeographics < Base
      register_filters :geographic

      def initialize(year, filters = {})
        @year = year
        @geographic = Geographic::TYPES.include?(filters[:geographic]) ? filters[:geographic] : "countries"
      end

      def enabled_cache?
        true
      end

      def cache_key
        "geographic=#{geographic}"
      end

      private

      def headers
        [
          {label: Geographic.find(geographic).name, value: :geographic},
          {label: I18n.t("widgets.headers.common.funded_with"), value: :funded_with}
        ]
      end

      def values
        subgeographics.sort_by(&:name).map do |subgeographic|
          [
            {id: subgeographic.id, value: subgeographic.name},
            {value: (investment_data[subgeographic.id] || 0).to_f}
          ]
        end
      end

      def investment_data
        @investment_data ||= Investment.where(id: investments_subquery.select(:id)).select(:id, :amount)
          .includes(:subgeographics, :subgeographic_ancestors).each_with_object({}) do |investment, res|
          subgeographics = investment.subgeographic_ancestors.to_a.select { |s| s.geographic == geographic }
          number_of_subgeographics = investment.subgeographics.to_a.size
          subgeographics.each do |subgeographic|
            res[subgeographic.id] = (res[subgeographic.id] || 0) + (investment.amount / number_of_subgeographics).round
          end
        end
      end

      def investments_subquery
        Investment.can_show_aggregated_amount.joins(:subgeographic_ancestors).where year_invested: year, subgeographics: {geographic: geographic}
      end

      def subgeographics
        @subgeographics ||= begin
          subgeographics = Subgeographic.select(:id, :name, :abbreviation).where geographic: geographic
          subgeographics = subgeographics.only_active if geographic == "countries"
          subgeographics.to_a
        end
      end
    end
  end
end
