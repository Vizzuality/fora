module Importers
  module Subgeographics
    class States < Base
      private

      def attributes_of_record_for(feature)
        {
          name: feature.properties["name"],
          code: feature.properties["code"],
          geographic: "states",
          geometry: feature.geometry,
          parent_id: regions[feature.properties["region_id"]].first.id
        }
      end

      def regions
        @regions ||= Subgeographic.regions.group_by(&:code)
      end
    end
  end
end
