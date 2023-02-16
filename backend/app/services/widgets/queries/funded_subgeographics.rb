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
          subgeographics_within_geographic, subgeographics_outside_geographic = subgeographics_for investment
          number_of_subgeographics = subgeographics_within_geographic.size + subgeographics_outside_geographic.size
          subgeographics_within_geographic.each do |subgeographic|
            res[subgeographic.id] = (res[subgeographic.id] || 0) + (investment.amount / number_of_subgeographics).round
          end
        end
      end

      def subgeographics_for(investment)
        subgeographics_within_geographic = []
        subgeographics_outside_geographic = []
        Subgeographics::BuildPaths.new(investment.subgeographics, investment.subgeographic_ancestors).call.each do |path|
          subgeographic = path.find { |s| s.geographic == geographic }
          subgeographic.blank? ? subgeographics_outside_geographic << path.first : subgeographics_within_geographic << subgeographic
        end
        [subgeographics_within_geographic.compact.uniq, subgeographics_outside_geographic.compact.uniq]
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
