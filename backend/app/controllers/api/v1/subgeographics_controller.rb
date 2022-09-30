module API
  module V1
    class SubgeographicsController < BaseController
      load_and_authorize_resource

      def index
        @subgeographics = @subgeographics.where geographic: filter_params[:geographic] if filter_params[:geographic].present?
        @subgeographics = @subgeographics.includes :parent, :subgeographics
        @subgeographics = @subgeographics.order :name
        render json: SubgeographicSerializer.new(
          @subgeographics,
          include: included_relationships,
          fields: sparse_fieldset,
          params: {current_user: current_user, current_ability: current_ability}
        ).serializable_hash
      end

      private

      def filter_params
        params.fetch(:filter, {}).permit :geographic
      end
    end
  end
end
