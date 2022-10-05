module API
  module V1
    class SubgeographicSerializer < BaseSerializer
      attributes :name,
        :code,
        :geographic,
        :created_at,
        :updated_at

      belongs_to_restricted :parent, serializer: :subgeographic

      has_many_restricted :subgeographics
    end
  end
end
