module Widgets
  module Queries
    class Summary < Base
      private

      def headers
        [
          {label: I18n.t("widgets.headers.summary.total_number_funders"), value: :total_funders},
          {label: I18n.t("widgets.headers.summary.total_number_projects"), value: :total_projects},
          {label: I18n.t("widgets.headers.summary.total_capital"), value: :total_capital},
          {label: I18n.t("widgets.headers.summary.total_grants"), value: :total_grants}
        ]
      end

      def values
        [[
          {value: Funder.where(date_joined_fora: ..DateTime.new(year).end_of_year).count},
          {value: Investment.where(year_invested: year).count("DISTINCT investments.project_id")},
          {value: Investment.where(year_invested: year).sum(:amount)},
          {value: Investment.where(year_invested: year).where("capital_types && ARRAY[?]::varchar[]", %w[grants re_grants]).sum(:amount)}
        ]]
      end
    end
  end
end
