module Backoffice
  Breadcrumb = Struct.new :title, :path

  module AsResource
    extend ActiveSupport::Concern

    included do
      before_action :initialize_resource, only: [:new, :create]
      before_action :fetch_resource, only: %i[show edit update destroy]
      before_action :set_breadcrumbs, except: [:index]

      helper_method :resource_class, :resources_url
    end

    def index
      @q = resource_class.ransack params[:q]
      @pagy_object, @resources = pagy @q.result.order(created_at: :desc), pagy_defaults
    end

    def show
    end

    def new
    end

    def create
      if @resource.update create_params
        yield(@resource) if block_given?
        redirect_to resource_url(@resource), notice: t("backoffice.messages.success_create", model: resource_class.model_name.human)
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      if @resource.update update_params
        yield(@resource) if block_given?
        redirect_to resource_url(@resource), notice: t("backoffice.messages.success_update", model: resource_class.model_name.human)
      else
        render :new, status: :unprocessable_entity
      end
    end

    def destroy
      @resource.destroy!

      redirect_to resources_url, status: :see_other, notice: t("backoffice.messages.success_delete", model: resource_class.model_name.human)
    end

    private

    def create_params
      raise NotImplementedError
    end

    def initialize_resource
      @resource = resource_class.new
    end

    def fetch_resource
      @resource = resource_class.find params[:id]
    end

    def set_breadcrumbs
      @breadcrumbs = [Breadcrumb.new(resource_class.model_name.human, resources_url)]
      @breadcrumbs << if @resource.new_record?
        Breadcrumb.new(I18n.t("backoffice.messages.new_record", model: resource_class.model_name.human))
      else
        Breadcrumb.new(ActionController::Base.helpers.truncate(@resource.to_s, length: 100))
      end
    end

    def resources_url(*args)
      send("backoffice_#{controller_name.classify.to_s.underscore.pluralize}_url", *args)
    end

    def resource_url(*args)
      send("backoffice_#{controller_name.classify.to_s.underscore.singularize}_url", *args)
    end

    def resource_class
      controller_name.classify.constantize
    end
  end
end
