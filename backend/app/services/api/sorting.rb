module API
  class Sorting
    attr_accessor :query, :sorting_attribute, :sorting_direction

    SORTING_DIRECTIONS = %i[asc desc].freeze

    def initialize(query, sorting, columns)
      @query = query
      @sorting_direction = SORTING_DIRECTIONS.find { |option| option == sorting[:direction]&.to_sym } || :desc
      @sorting_attribute = sorting_attribute_for sorting[:attribute], columns
    end

    def call
      return query if sorting_attribute.blank?

      query.order sorting_attribute => sorting_direction
    end

    private

    def sorting_attribute_for(attribute, columns)
      return columns[attribute&.to_sym] if columns.is_a?(Hash)

      columns.find { |option| option == attribute&.to_sym }
    end
  end
end
