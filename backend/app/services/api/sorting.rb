module API
  class Sorting
    attr_accessor :query, :sorting_attribute, :sorting_direction

    SORTING_DIRECTIONS = %i[asc desc].freeze

    def initialize(query, sorting, columns)
      @query = query
      @sorting_direction = SORTING_DIRECTIONS.find { |option| option == sorting[:direction]&.to_sym } || :desc
      @sorting_attribute = columns.find { |option| option == sorting[:attribute]&.to_sym }
    end

    def call
      return query if sorting_attribute.blank?

      query.order sorting_attribute => sorting_direction
    end
  end
end
