module API
  Error = Class.new(StandardError)

  module Errors
    def self.included(base)
      base.rescue_from API::Error, with: :render_error
      base.rescue_from CanCan::AccessDenied, with: :render_forbidden_error
      base.rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error
    end

    def render_error(exception)
      render json: {errors: [{title: exception.message}]}, status: :bad_request
    end

    def render_not_found_error(exception)
      render json: {errors: [{title: exception.message}]}, status: :not_found
    end

    def render_forbidden_error(exception)
      render json: {errors: [{title: exception.message}]}, status: :forbidden
    end
  end
end
