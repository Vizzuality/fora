module Importers
  module Uploads
    class Base
      include Submodules::Enums
      include Submodules::Subgeographics
      include Submodules::Logos

      attr_accessor :data, :images, :errors

      def initialize(data, images, errors)
        @data = data
        @images = images
        @errors = errors
      end

      def call
        data.each do |attr|
          create_with! attr
        rescue EnumError => e
          store_error "activerecord.errors.importers.uploads.enum_error", e.message, attr
        rescue ActiveRecord::RecordInvalid => e
          e.record.errors.each do |error|
            store_error "activerecord.errors.importers.uploads.record_invalid", error.full_message, attr
          end
        rescue ActiveRecord::RecordNotFound => e
          store_error "activerecord.errors.importers.uploads.dependency_error", e.message, attr
        end
      end

      private

      def create_with!(attr)
        raise NotImplementedError
      end

      def column_name_for(key)
        self.class.const_get(:COLUMNS)[key]
      end

      def simple_column_for(key, attr)
        value = attr[column_name_for(key)]
        value.is_a?(Array) ? value.last : value
      end

      def boolean_column_for(key, attr)
        simple_column_for(key, attr).to_s.downcase == "yes"
      end

      def store_error(scope, message, attr)
        errors << I18n.t(scope,
          klass_name: self.class.name.demodulize.singularize,
          respondent_id: simple_column_for(:respondent_id, attr),
          error: message)
      end
    end
  end
end
