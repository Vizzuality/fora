module Importers
  module Subgeographics
    class Countries < Base
      private

      def attributes_of_record_for(feature)
        {
          name: feature.properties["name"],
          code: feature.properties["id"],
          geographic: "countries",
          geometry: feature.geometry
        }
      end
    end
  end
end
