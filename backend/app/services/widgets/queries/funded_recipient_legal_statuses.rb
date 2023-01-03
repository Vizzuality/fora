module Widgets
  module Queries
    class FundedRecipientLegalStatuses < Base
      private

      def headers
        [
          {label: I18n.t("activerecord.models.recipient_legal_status.one"), value: :recipient_legal_status},
          {label: I18n.t("widgets.headers.common.values"), value: :values}
        ]
      end

      def values
        RecipientLegalStatus.all.sort_by(&:name).map do |recipient_legal_status|
          [
            {id: recipient_legal_status.id, value: recipient_legal_status.name},
            {value: (investments[recipient_legal_status.id] || 0).to_f}
          ]
        end
      end

      def investments
        @investments ||= Investment.can_show_aggregated_amount.where(year_invested: year).joins(project: :recipient)
          .group("recipients.recipient_legal_status").sum(:amount)
      end
    end
  end
end
