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
          {value: Investment.can_be_shown_without_amount.where(year_invested: year).count("DISTINCT investments.funder_id").to_f},
          {value: Investment.can_be_shown_without_amount.where(year_invested: year).count("DISTINCT investments.project_id").to_f},
          {value: Investment.can_show_aggregated_amount.where(year_invested: year).sum(:amount).to_f},
          {value: Investment.can_show_aggregated_amount.where(year_invested: year).where(capital_type: %w[grants re_grants]).sum(:amount).to_f}
        ]]
      end
    end
  end
end
