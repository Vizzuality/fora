module API
  module V1
    class ProjectsController < BaseController
      include API::Pagination

      load_and_authorize_resource

      ENUM_FILTERS = %i[areas demographics recipient_legal_statuses]

      def index
        @projects = @projects.for_subgeographics filter_params[:subgeographics].split(",") if filter_params[:subgeographics].present?
        @projects = @projects.for_geographics filter_params[:geographic] if filter_params[:geographic].present?
        @projects = API::EnumFilter.new(
          @projects.joins(:recipient).left_joins(:investments),
          filter_params.to_h.slice(*ENUM_FILTERS),
          extra_models: [Recipient, Investment]
        ).call
        @projects = Project.where(id: @projects.pluck(:id))
          .includes recipient: [:state, :country, :subgeographics, :subgeographic_ancestors, logo_attachment: [:blob]]
        pagy_object, @projects = pagy @projects, page: current_page, items: per_page unless params[:disable_pagination].to_s == "true"
        render json: ProjectSerializer.new(
          @projects,
          include: included_relationships,
          fields: sparse_fieldset,
          links: pagy_object.present? ? pagination_links(:api_v1_projects_path, pagy_object) : nil,
          meta: pagy_object.present? ? pagination_meta(pagy_object) : nil,
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

      private

      def filter_params
        params.fetch(:filter, {}).permit :geographic, :subgeographics, *ENUM_FILTERS
      end
    end
  end
end
