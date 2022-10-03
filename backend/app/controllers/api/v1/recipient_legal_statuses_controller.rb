# This file was generated with rails g enum RecipientLegalStatus

module API
  module V1
    class RecipientLegalStatusesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::RecipientLegalStatusSerializer.new(@recipient_legal_statuses).serializable_hash
      end
    end
  end
end
