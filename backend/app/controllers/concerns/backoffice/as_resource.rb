module Backoffice
  module AsResource
    extend ActiveSupport::Concern

    def index
      @q = resource_class.ransack params[:q]
      @pagy_object, @resources = pagy @q.result, pagy_defaults
    end

    def show
      @resource = resource_class.find params[:id]
    end

    private

    def resource_class
      controller_name.classify.constantize
    end
  end
end
