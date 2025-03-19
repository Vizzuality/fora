module API
  module V1
    module Members
      class ProjectsController < BaseController
        include API::Pagination

        skip_before_action :require_json!, only: %i[create update]

        load_and_authorize_resource

        SORTING_COLUMNS = {
          name: "recipients.name",
          created_at: "projects.created_at",
          updated_at: "projects.updated_at"
        }.freeze

        def index
          @projects = @projects.joins(:recipient).where member: current_member
          @projects = API::Sorting.new(@projects, sorting_params, SORTING_COLUMNS).call.order :created_at
          pagy_object, @projects = pagy @projects, page: current_page, items: per_page unless params[:disable_pagination].to_s == "true"
          render json: ProjectSerializer.new(
            @projects,
            include: included_relationships,
            fields: sparse_fieldset,
            links: pagy_object.present? ? pagination_links(:api_v1_members_projects_path, pagy_object) : nil,
            meta: pagy_object.present? ? pagination_meta(pagy_object) : nil,
            params: {current_member: current_member, current_ability: current_ability}
          ).serializable_hash
        end

        def show
          render json: ProjectSerializer.new(
            current_member.projects.find(params[:id]),
            include: included_relationships,
            fields: sparse_fieldset,
            params: {current_member: current_member, current_ability: current_ability}
          ).serializable_hash
        end

        def create
          @project = Project.new create_params
          if @project.save
            render json: ProjectSerializer.new(
              @project,
              include: included_relationships,
              fields: sparse_fieldset,
              params: {current_member: current_member, current_ability: current_ability}
            ).serializable_hash
          else
            raise API::UnprocessableEntityError, @project.errors.full_messages.to_sentence
          end
        end

        def update
          if @project.update update_params
            render json: ProjectSerializer.new(
              @project,
              include: included_relationships,
              fields: sparse_fieldset,
              params: {current_member: current_member, current_ability: current_ability}
            ).serializable_hash
          else
            raise API::UnprocessableEntityError, @project.errors.full_messages.to_sentence
          end
        end

        def destroy
          @project.destroy!
          head :ok
        rescue ActiveRecord::DeleteRestrictionError
          raise API::UnprocessableEntityError, @project.errors.full_messages.to_sentence
        end

        private

        def create_params
          update_params
        end

        def update_params
          project_params.merge(
            recipient_attributes: recipient_params.to_h
          )
        end

        def project_params
          {member_id: current_member.id}
        end

        def recipient_params
          params.fetch(:project_params, params).permit(
            :name,
            :description,
            :logo,
            :contact_first_name,
            :contact_last_name,
            :website,
            :country_id,
            :state_id,
            :city,
            :leadership_demographics_other,
            :recipient_legal_status,
            leadership_demographics: []
          )
        end

        def sorting_params
          params.fetch(:sort, {}).permit :attribute, :direction
        end
      end
    end
  end
end
