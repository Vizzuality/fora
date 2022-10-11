# This file was generated with rails g enum FundingType

module API
  module V1
    class FundingTypesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::FundingTypeSerializer.new(@funding_types.sort_by(&:name)).serializable_hash
      end
    end
  end
end
