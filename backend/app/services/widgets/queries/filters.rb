module Widgets
  module Queries
    module Filters
      extend ActiveSupport::Concern

      class_methods do
        def support_filters?
          supported_filters.present?
        end

        def supported_filters
          @supported_filters ||= []
        end

        private

        def register_filters(*args)
          args.each do |filter|
            next if filter.in? supported_filters

            supported_filters << filter
            attr_accessor filter
          end
        end

        def reset_filters
          @supported_filters = []
        end
      end
    end
  end
end
