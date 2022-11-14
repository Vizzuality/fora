module Widgets
  module Queries
    class Base
      include Filters

      attr_accessor :year

      def initialize(year, filters = {})
        @year = year
        self.class.supported_filters.each { |key| public_send "#{key}=", filters[key]&.split(",") }
      end

      def call
        {headers: headers, values: values}
      end

      def title
        nil
      end

      def enabled_cache?
        !self.class.support_filters?
      end

      def cache_key
        nil
      end

      private

      def headers
        []
      end

      def values
        [[]]
      end
    end
  end
end
