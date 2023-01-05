module API
  module V1
    class FunderSerializer < BaseSerializer
      include BlobSerializer

      attributes :name,
        :description,
        :primary_office_city,
        :website,
        :date_joined_fora,
        :funder_type,
        :funder_type_other,
        :capital_acceptances,
        :capital_acceptances_other,
        :leadership_demographics,
        :leadership_demographics_other,
        :application_status,
        :funder_legal_status,
        :funder_legal_status_other,
        :networks,
        :capital_types,
        :capital_types_other,
        :spend_down_strategy,
        :areas,
        :areas_other,
        :demographics,
        :demographics_other

      belongs_to_restricted :primary_office_state, serializer: :subgeographic
      belongs_to_restricted :primary_office_country, serializer: :subgeographic

      has_many_restricted :subgeographics
      has_many_restricted :subgeographic_ancestors, serializer: :subgeographic
      has_many_restricted :projects

      attribute :contact_email do |object, _params|
        next object.secondary_email_which_can_be_shared unless object.show_primary_email?

        object.primary_contact_email.presence || object.secondary_email_which_can_be_shared
      end

      attribute :logo do |object|
        image_links_for object.logo
      end
    end
  end
end
