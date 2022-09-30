module Importers
  module Subgeographics
    class Regions < Base
      private

      def attributes_of_record_for(feature)
        {
          name: feature.properties["name"],
          code: feature.properties["id"],
          geographic: "regions",
          geometry: feature.geometry,
          parent_id: usa_country.id
        }
      end

      def usa_country
        @usa_country ||= Subgeographic.countries.find_by! code: "USA"
      end
    end
  end
end
