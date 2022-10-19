module API
  module V1
    class ProjectsController < BaseController
      load_and_authorize_resource

      def index
        @projects = @projects.includes recipient: [:state, :country, :subgeographics, :subgeographic_ancestors, logo_attachment: [:blob]]
        render json: ProjectSerializer.new(
          @projects,
          include: included_relationships,
          fields: sparse_fieldset,
          params: {current_user: current_user, current_ability: current_ability}
        ).serializable_hash
      end

      def show
        render json: ProjectSerializer.new(
          @project,
          include: included_relationships,
          fields: sparse_fieldset,
          params: {current_user: current_user, current_ability: current_ability}
        ).serializable_hash
      end
    end
  end
end
