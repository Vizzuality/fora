module API
  module V1
    module Members
      class FundersController < BaseController
        skip_before_action :require_json!, only: %i[update]

        load_and_authorize_resource

        def show
          render json: FunderSerializer.new(
            current_member.funder,
            include: included_relationships,
            fields: sparse_fieldset,
            params: {current_member: current_member, current_ability: current_ability}
          ).serializable_hash
        end

        def update
          if current_member.funder.update(funder_params)
            render json: FunderSerializer.new(
              current_member.funder,
              include: included_relationships,
              fields: sparse_fieldset,
              params: {current_member: current_member, current_ability: current_ability}
            ).serializable_hash
          else
            raise API::UnprocessableEntityError, current_member.funder.errors.full_messages.to_sentence
          end
        end

        private

        def funder_params
          p = params.fetch(:funder_params, params).permit(
            :name,
            :description,
            :logo,
            :primary_office_address,
            :primary_office_city,
            :primary_office_state_id,
            :primary_office_country_id,
            :primary_contact_first_name,
            :primary_contact_last_name,
            :primary_contact_email,
            :show_primary_email,
            :primary_contact_phone,
            :primary_contact_location,
            :primary_contact_role,
            :secondary_email_which_can_be_shared,
            :website,
            :date_joined_fora,
            :funder_type,
            :funder_type_other,
            :capital_acceptances_other,
            :leadership_demographics_other,
            :number_staff_employees,
            :application_status,
            :funder_legal_status,
            :funder_legal_status_other,
            :new_to_regenerative_ag,
            :networks,
            :capital_types_other,
            :spend_down_strategy,
            :areas_other,
            :demographics_other,
            capital_acceptances: [],
            leadership_demographics: [],
            capital_types: [],
            areas: [],
            demographics: [],
            subgeographic_ids: []
          )
          p.merge published: true
        end
      end
    end
  end
end
