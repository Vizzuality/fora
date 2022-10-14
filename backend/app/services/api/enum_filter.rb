module API
  class EnumFilter
    attr_accessor :query, :filters

    def initialize(query, filters)
      @query = query
      @filters = filters
    end

    def call
      query.merge build_enum_query
    end

    private

    def build_enum_query
      pluralize_keys_in(filters).slice(*column_names).inject(query.klass.all) do |enum_query, (filter_key, filter_value)|
        enum_query.where ActiveRecord::Base.sanitize_sql(["ARRAY[#{filter_key}]::text[] && ARRAY[?]::text[]", filter_value.split(",")])
      end
    end

    def pluralize_keys_in(hash)
      hash.each_with_object({}) do |(key, value), res|
        res[key.to_s.singularize] = value
        res[key.to_s.pluralize] = value
      end
    end

    def column_names
      @column_names ||= query.klass.column_names
    end
  end
end
