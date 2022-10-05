# This file was generated with rails g enum Role

module API
  module V1
    class RolesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::RoleSerializer.new(@roles.sort_by(&:name)).serializable_hash
      end
    end
  end
end
