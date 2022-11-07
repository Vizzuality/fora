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
        {headers: headers, data: data}
      end

      def title
        nil
      end

      private

      def headers
        []
      end

      def data
        []
      end
    end
  end
end
