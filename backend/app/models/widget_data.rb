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
      return query_service.call if query_klass.support_filters? # do not cache data which uses filters for now, because it contains too many options

      Rails.cache.fetch "widget-data-#{widget.id}", expires_in: 1.hour do
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
