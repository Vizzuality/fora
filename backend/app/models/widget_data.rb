require "csv"

class WidgetData
  attr_accessor :widget, :filters

  delegate :id, :slug, to: :widget

  def initialize(widget:, filters:)
    @widget = widget
    @filters = filters.presence || {}
  end

  def title
    query_service.title.presence || widget.title
  end

  def data
    @data ||= begin
      return query_service.call unless query_service.enabled_cache?

      Rails.cache.fetch "widget-data-#{widget.id}-#{query_service.cache_key}", expires_in: 1.hour do
        query_service.call
      end
    end
  end

  def to_csv
    CSV.generate(headers: true) do |csv|
      csv << data[:headers].pluck(:label)
      data[:values].each { |row| csv << row.pluck(:value) }
    end
  end

  private

  def query_service
    @query_service ||= query_klass.new widget.report_year, filters
  end

  def query_klass
    @query_klass ||= WidgetSlug::TYPES_WITH_QUERIES[widget.slug]
  end
end
