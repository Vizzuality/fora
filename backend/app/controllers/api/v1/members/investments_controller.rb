module API
  module V1
    module Members
      class InvestmentsController < BaseController
        include API::Pagination

        load_and_authorize_resource

        def index
          @investments = current_member.investments
          pagy_object, @investments = pagy @investments, page: current_page, items: per_page unless params[:disable_pagination].to_s == "true"
          render json: InvestmentSerializer.new(
            @investments,
            include: included_relationships,
            fields: sparse_fieldset,
            links: pagy_object.present? ? pagination_links(:api_v1_members_investments_path, pagy_object) : nil,
            meta: pagy_object.present? ? pagination_meta(pagy_object) : nil,
            params: {current_member: current_member, current_ability: current_ability}
          ).serializable_hash
        end

        def show
          render json: InvestmentSerializer.new(
            current_member.investments.find(params[:id]),
            fields: sparse_fieldset,
            include: included_relationships,
            params: {current_member: current_member, current_ability: current_ability}
          ).serializable_hash
        end

        def create
          @investment = Investment.new create_params
          if @investment.save
            render json: InvestmentSerializer.new(
              @investment,
              fields: sparse_fieldset,
              include: included_relationships,
              params: {current_member: current_member, current_ability: current_ability}
            ).serializable_hash
          else
            raise API::UnprocessableEntityError, @investment.errors.full_messages.to_sentence
          end
        end

        def update
          if @investment.update update_params
            render json: InvestmentSerializer.new(
              @investment,
              fields: sparse_fieldset,
              include: included_relationships,
              params: {current_member: current_member, current_ability: current_ability}
            ).serializable_hash
          else
            raise API::UnprocessableEntityError, @investment.errors.full_messages.to_sentence
          end
        end

        def destroy
          @investment.destroy!
          head :ok
        end

        private

        def create_params
          update_params.merge(
            funder_id: current_member.funder_id
          )
        end

        def update_params
          params.permit(
            :amount,
            :year_invested,
            :initial_funded_year,
            :funding_type,
            :funding_type_other,
            :areas_other,
            :grant_duration,
            :number_of_grant_years,
            :demographics_other,
            :capital_type,
            :capital_type_other,
            :submitting_organization_contact_name,
            :privacy,
            :project_id,
            areas: [],
            demographics: []
          )
        end
      end
    end
  end
end
