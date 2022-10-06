module API
  module V1
    class FundersController < BaseController
      load_and_authorize_resource

      def index
        @funders = @funders.includes :primary_office_state, :primary_office_country, :subgeographics
        @funders = @funders.order :name
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
    end
  end
end
