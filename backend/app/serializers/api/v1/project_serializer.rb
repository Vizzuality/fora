module API
  module V1
    class ProjectSerializer < BaseSerializer
      include BlobSerializer

      attributes :name,
        :description,
        :recipient_name,
        :website,
        :leadership_demographics,
        :leadership_demographics_other,
        :demographics,
        :demographics_other,
        :recipient_legal_status,
        :recipient_legal_status_other

      belongs_to_restricted :state, serializer: :subgeographic
      belongs_to_restricted :country, serializer: :subgeographic

      has_many_restricted :subgeographics
      has_many_restricted :subgeographic_ancestors, serializer: :subgeographic
      has_many_restricted :investments
      has_many_restricted :funders

      attribute :areas do |object|
        object.investments.map { |i| i.areas }.flatten.uniq
      end

      attribute :logo do |object|
        image_links_for object.logo
      end
    end
  end
end
