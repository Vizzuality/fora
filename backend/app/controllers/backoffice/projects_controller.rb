module Backoffice
  class ProjectsController < BaseController
    include AsResource

    self.includes = %i[recipient]

    def new
      super
      @resource.build_recipient
    end

    private

    def create_params
      params.require(:project).permit(recipient_attributes: %i[name published])
    end
  end
end
