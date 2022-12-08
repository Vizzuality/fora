module API
  class EnumFilter
    attr_accessor :query, :filters, :extra_belongs_to_models, :extra_has_many_models

    def initialize(query, filters, extra_belongs_to_models: [], extra_has_many_models: {})
      @query = query
      @filters = pluralize_keys_in filters
      @extra_belongs_to_models = extra_belongs_to_models
      @extra_has_many_models = extra_has_many_models
    end

    def call
      query.merge(build_enum_query).merge build_enum_query_for_has_many_models
    end

    private

    def build_enum_query
      filters.slice(*column_names).inject(query.klass.all) do |enum_query, (filter_key, filter_value)|
        enum_query.where condition_for(filter_key, filter_value)
      end
    end

    def build_enum_query_for_has_many_models
      enum_query = query.klass.all
      extra_has_many_models.each do |klass, select_key|
        filters.slice(*klass.column_names).each do |filter_key, filter_value|
          enum_query = enum_query.where id: klass.select(select_key).where(condition_for(filter_key, filter_value))
        end
      end
      enum_query
    end

    def pluralize_keys_in(hash)
      hash.each_with_object({}) do |(key, value), res|
        res[key.to_s.singularize] = value
        res[key.to_s.pluralize] = value
      end
    end

    def condition_for(key, value)
      ActiveRecord::Base.sanitize_sql ["ARRAY[#{key}]::text[] && ARRAY[?]::text[]", value.split(",")]
    end

    def column_names
      @column_names ||= query.klass.column_names + extra_belongs_to_models.map { |m| m.column_names }.flatten
    end
  end
end
