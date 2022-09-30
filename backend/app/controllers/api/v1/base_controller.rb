module API
  module V1
    class BaseController < ActionController::API
      include ActionController::RequestForgeryProtection
      include API::Errors
      include API::Authentication

      protect_from_forgery with: :exception

      wrap_parameters format: [:json]

      before_action :require_json!

      private

      def sparse_fieldset
        (params[:fields]&.to_unsafe_h || {}).transform_values { |v| v.split(",") }
      end

      def included_relationships
        params[:includes]&.split(",")
      end

      def require_json!
        return if request.get? || request.content_type.to_s.starts_with?("application/json")

        raise API::Error, "application/json content type is required by the requested endpoint"
      end
    end
  end
end
