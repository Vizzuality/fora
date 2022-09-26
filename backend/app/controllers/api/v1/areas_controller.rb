# This file was generated with rails g enum Area

module API
  module V1
    class AreasController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::AreaSerializer.new(@areas).serializable_hash
      end
    end
  end
end
