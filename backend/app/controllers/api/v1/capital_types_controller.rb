# This file was generated with rails g enum CapitalType

module API
  module V1
    class CapitalTypesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::CapitalTypeSerializer.new(@capital_types.sort_by(&:name)).serializable_hash
      end
    end
  end
end
