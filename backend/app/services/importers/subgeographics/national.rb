module Importers
  module Subgeographics
    class National < Base
      private

      def attributes_of_record_for(feature)
        {
          name: feature.properties["name"],
          code: feature.properties["code"],
          geographic: "national",
          geometry: feature.geometry,
          parent_id: countries[feature.properties["code"]].first&.id
        }
      end

      def countries
        @countries ||= Subgeographic.countries.group_by(&:code)
      end
    end
  end
end
