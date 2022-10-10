module API
  module V1
    class FundersController < BaseController
      load_and_authorize_resource

      ENUM_FILTERS = %i[areas demographics funder_types capital_types funder_legal_status]

      def index
        @funders = @funders.for_subgeographics filter_params[:subgeographic_ids] if filter_params[:subgeographic_ids].present?
        @funders = @funders.for_geographics filter_params[:geographics] if filter_params[:geographics].present?
        @funders = @funders.search filter_params[:full_text] if filter_params[:full_text].present?
        @funders = API::EnumFilter.new(@funders, filter_params.to_h.slice(*ENUM_FILTERS)).call
        @funders = Funder.where(id: @funders.pluck(:id)).order(:name)
          .includes :primary_office_state, :primary_office_country, :subgeographics, :subgeographic_ancestors
        render json: FunderSerializer.new(
          @funders,
          include: included_relationships,
          fields: sparse_fieldset,
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

      def filter_params
        params.fetch(:filter, {}).permit :geographics, :subgeographic_ids, :full_text, *ENUM_FILTERS
      end
    end
  end
end
