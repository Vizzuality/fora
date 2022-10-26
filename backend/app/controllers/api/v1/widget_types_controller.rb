# This file was generated with rails g enum WidgetType

module API
  module V1
    class WidgetTypesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::WidgetTypeSerializer.new(@widget_types.sort_by(&:name)).serializable_hash
      end
    end
  end
end
