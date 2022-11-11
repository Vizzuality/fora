module API
  module ParamsValidations
    module ClassMethods
      def mandatory_attributes(attrs, only: nil)
        before_action(only: only) do |_|
          [].tap do |result|
            unpack_paths_for attrs, [], result
            result.each do |path|
              next if params.dig(*path).present?

              name = path.first + path[1..].map { |p| "[#{p}]" }.join
              raise API::UnprocessableEntityError, I18n.t("api.errors.missing_mandatory_param", name: name)
            end
          end
        end
      end
    end

    def self.included(base)
      base.extend ClassMethods
    end

    def unpack_paths_for(attrs, keys = [], result = [])
      if attrs.is_a? Hash
        attrs.each { |key, values| unpack_paths_for(values, keys.dup + [key.to_s], result) }
      elsif attrs.is_a? Array
        attrs.each { |value| unpack_paths_for(value, keys.dup, result) }
      else
        result << (keys + [attrs.to_s])
      end
    end
  end
end
