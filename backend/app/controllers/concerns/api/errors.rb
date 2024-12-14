module API
  Error = Class.new(StandardError)
  UnprocessableEntityError = Class.new(Error)

  module Errors
    def self.included(base)
      base.rescue_from API::Error, with: :render_error
      base.rescue_from CanCan::AccessDenied, with: :render_forbidden_error
      base.rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error
      base.rescue_from API::UnprocessableEntityError, with: :render_unprocessable_entity_error
      base.rescue_from ActiveRecord::RecordInvalid, with: :render_validation_errors
      base.rescue_from ActiveRecord::RecordNotUnique, with: :render_validation_errors
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

    def render_validation_errors(ex_or_record)
      record = ex_or_record.is_a?(ActiveRecord::Base) ? ex_or_record : ex_or_record.record
      render json: {errors: record.errors.map { |e| {title: e.full_message} }}, status: :unprocessable_entity
    end

    def render_unprocessable_entity_error(exception)
      render json: {errors: [{title: exception.message}]}, status: :unprocessable_entity
    end
  end
end
