# This file was generated with rails g enum WidgetSlug

module API
  module V1
    class WidgetSlugsController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::WidgetSlugSerializer.new(@widget_slugs.sort_by(&:name)).serializable_hash
      end
    end
  end
end
