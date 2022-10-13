module Importers
  module Subgeographics
    class Base
      attr_accessor :path

      def initialize(path)
        @path = path
      end

      def call
        Subgeographic.transaction do
          geojson_features.map do |feature|
            attr = attributes_of_record_for(feature)
            Subgeographic.create! attr.except(:geometry).merge(subgeographic_geometry_attributes: attr.slice(:geometry))
          rescue ActiveRecord::RecordInvalid => e
            puts "Skipping #{attr[:geographic]}-#{attr[:name]}: #{e.message}"
          end
        end
      rescue Errno::ENOENT
        puts "GeoJSON at #{path} with location data was not found. Skipping location import!"
      end

      private

      def geojson_features
        data = RGeo::GeoJSON.decode File.read(path)
        return data if data.is_a? RGeo::GeoJSON::FeatureCollection

        Array.wrap data
      end

      def attributes_of_record_for(feature)
        raise NotImplementedError
      end
    end
  end
end
