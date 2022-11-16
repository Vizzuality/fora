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
        @funders ||= Funder.where(date_joined_fora: ..DateTime.new(year).end_of_year).group("funder_type").count
      end
    end
  end
end
