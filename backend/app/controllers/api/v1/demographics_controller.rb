# This file was generated with rails g enum Demographic

module API
  module V1
    class DemographicsController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::DemographicSerializer.new(@demographics.sort_by(&:name)).serializable_hash
      end
    end
  end
end
