# This file was generated with rails g enum GrantDuration

module API
  module V1
    class GrantDurationsController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::GrantDurationSerializer.new(@grant_durations).serializable_hash
      end
    end
  end
end
