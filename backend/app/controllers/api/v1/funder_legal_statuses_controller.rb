# This file was generated with rails g enum FunderLegalStatus

module API
  module V1
    class FunderLegalStatusesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::FunderLegalStatusSerializer.new(@funder_legal_statuses.sort_by(&:name)).serializable_hash
      end
    end
  end
end
