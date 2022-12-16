module Importers
  module Uploads
    class EnumError < StandardError; end

    module Submodules
      module Enums
        extend ActiveSupport::Concern

        private

        def assign_enum_to(record, key, enum_klass, attr)
          enums, others = enums_for Array.wrap(attr[column_name_for(key)]), enum_klass
          supports_other = record.respond_to? "#{key}_other"
          is_array = record.class.columns.find { |c| c.name == key.to_s }.array?
          validate_enums! key, enums, others, supports_other, is_array

          enums << "other" if supports_other && others.present?
          record.public_send "#{key}=", is_array ? enums.uniq : enums.first
          record.public_send "#{key}_other=", others.first if supports_other
        end

        def enums_for(values, enum_klass)
          enums, others = [[], []]
          values.to_a.each do |value|
            enum = enum_klass.find_by_name value
            enum.blank? ? others << value : enums << enum.id
          end
          [enums, others]
        end

        def validate_enums!(key, enums, others, supports_other, is_array)
          if !supports_other && others.present?
            raise EnumError, I18n.t("activerecord.errors.importers.uploads.unknown_enum", key: key, values: others.join(","))
          elsif !is_array && enums.size > 1
            raise EnumError, I18n.t("activerecord.errors.importers.uploads.multiple_values", key: key)
          elsif supports_other && others.size > 1
            raise EnumError, I18n.t("activerecord.errors.importers.uploads.multiple_other_enums", key: key, values: others.join(","))
          end
        end
      end
    end
  end
end
