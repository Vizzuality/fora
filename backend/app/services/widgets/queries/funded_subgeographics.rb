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
            {value: (investments[subgeographic.id] || 0).to_f}
          ]
        end
      end

      def investments
        @investments ||= Investment.select(:amount, :project_id).includes(project: {recipient: :subgeographic_ancestors})
          .where(year_invested: year, project: Project.for_geographics(geographic).select(:id))
          .each_with_object({}) do |investment, res|
          subgeographics = investment.project.recipient.subgeographic_ancestors.to_a.select { |s| s.geographic == geographic }
          subgeographics.each do |subgeographic|
            res[subgeographic.id] = (res[subgeographic.id] || 0) + (investment.amount / subgeographics.size).round
          end
        end
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
