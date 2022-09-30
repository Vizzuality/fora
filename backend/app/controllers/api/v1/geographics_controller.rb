# This file was generated with rails g enum Geographic

module API
  module V1
    class GeographicsController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::GeographicSerializer.new(@geographics.sort_by(&:name)).serializable_hash
      end
    end
  end
end
