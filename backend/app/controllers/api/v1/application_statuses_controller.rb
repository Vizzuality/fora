# This file was generated with rails g enum ApplicationStatus

module API
  module V1
    class ApplicationStatusesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::ApplicationStatusSerializer.new(@application_statuses.sort_by(&:name)).serializable_hash
      end
    end
  end
end
