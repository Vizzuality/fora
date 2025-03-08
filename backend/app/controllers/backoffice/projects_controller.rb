module Backoffice
  class ProjectsController < BaseController
    include AsResource

    self.includes = %i[recipient]

    def new
      super
      @resource.build_recipient
    end

    def destroy
      Project.transaction do
        @resource.investments.destroy_all
        @resource.destroy!

        redirect_to resources_url, status: :see_other, notice: t("backoffice.messages.success_delete", model: resource_class.model_name.human)
      end
    end

    private

    def create_params
      params.require(:project).permit(recipient_attributes: %i[name published])
    end
  end
end
