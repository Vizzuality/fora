module Importers
  module Subgeographics
    class Base
      attr_accessor :path

      def initialize(path)
        @path = path
      end

      def call
        Subgeographic.transaction do
          RGeo::GeoJSON.decode(File.read(path)).to_a.map do |feature|
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

      def attributes_of_record_for(feature)
        raise NotImplementedError
      end
    end
  end
end
