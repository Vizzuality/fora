class Widget < ApplicationRecord
  validates :slug, inclusion: {in: WidgetSlug::TYPES, allow_blank: true}, presence: true
  validates :report_pages, array_inclusion: {in: ReportPage::TYPES, allow_blank: true}, presence: true
  validates :report_year, inclusion: {in: ReportYear::TYPES, allow_blank: true}, presence: true
  validates :widget_type, inclusion: {in: WidgetType::TYPES, allow_blank: true}, presence: true

  validates_uniqueness_of :slug, scope: :report_year
  validates :position, numericality: {greater_than: 0}
end
