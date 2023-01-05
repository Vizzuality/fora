module API
  module V1
    class ProjectSerializer < BaseSerializer
      include BlobSerializer

      attributes :name,
        :description,
        :website,
        :leadership_demographics,
        :leadership_demographics_other,
        :areas,
        :demographics,
        :demographics_other,
        :recipient_legal_status

      belongs_to_restricted :state, serializer: :subgeographic
      belongs_to_restricted :country, serializer: :subgeographic

      has_many_restricted :subgeographics
      has_many_restricted :subgeographic_ancestors, serializer: :subgeographic
      has_many_restricted :funders

      attribute :logo do |object|
        image_links_for object.logo
      end
    end
  end
end
