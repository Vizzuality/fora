module Widgets
  module Queries
    class Base
      include Filters

      attr_accessor :year, :is_member_logged_in

      def initialize(year, filters = {}, is_member_logged_in = false)
        @year = year
        @is_member_logged_in = is_member_logged_in
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

      def enforce_privacy_for(query)
        if is_member_logged_in
          query.can_show_aggregated_amount_to_members
        else
          query.can_show_aggregated_amount
        end
      end
    end
  end
end
