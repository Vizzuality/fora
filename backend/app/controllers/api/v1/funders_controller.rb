module API
  module V1
    class FundersController < BaseController
      include API::Pagination

      load_and_authorize_resource

      ENUM_FILTERS = %i[areas demographics funder_types capital_types funder_legal_status]
      SORTING_COLUMNS = %i[name projects_count]

      def index
        @funders = @funders.for_subgeographics filter_params[:subgeographic_ids] if filter_params[:subgeographic_ids].present?
        @funders = @funders.for_geographics filter_params[:geographics] if filter_params[:geographics].present?
        @funders = @funders.search filter_params[:full_text] if filter_params[:full_text].present?
        @funders = API::EnumFilter.new(@funders, filter_params.to_h.slice(*ENUM_FILTERS)).call
        @funders = Funder.with_projects_count.where(id: @funders.pluck(:id))
          .includes :primary_office_state, :primary_office_country, :subgeographics, :subgeographic_ancestors
        @funders = API::Sorting.new(@funders, sorting_params, SORTING_COLUMNS).call.order :created_at
        pagy_object, @funders = pagy @funders, page: current_page, items: per_page unless params[:disable_pagination].to_s == "true"
        render json: FunderSerializer.new(
          @funders,
          include: included_relationships,
          fields: sparse_fieldset,
          links: pagy_object.present? ? pagination_links(:api_v1_funders_path, pagy_object) : nil,
          meta: pagy_object.present? ? pagination_meta(pagy_object) : nil,
          params: {current_user: current_user, current_ability: current_ability}
        ).serializable_hash
      end

      def show
        render json: FunderSerializer.new(
          @funder,
          include: included_relationships,
          fields: sparse_fieldset,
          params: {current_user: current_user, current_ability: current_ability}
        ).serializable_hash
      end

      private

      def sorting_params
        params.fetch(:sort, {}).permit :attribute, :direction
      end

      def filter_params
        params.fetch(:filter, {}).permit :geographics, :subgeographic_ids, :full_text, *ENUM_FILTERS
      end
    end
  end
end
