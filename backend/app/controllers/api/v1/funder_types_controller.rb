# This file was generated with rails g enum FunderType

module API
  module V1
    class FunderTypesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::FunderTypeSerializer.new(@funder_types.sort_by(&:name)).serializable_hash
      end
    end
  end
end
