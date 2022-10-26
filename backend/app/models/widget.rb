class Widget < ApplicationRecord
  has_many :widget_data, dependent: :destroy

  validates :report_pages, array_inclusion: {in: ReportPage::TYPES, allow_blank: true}, presence: true
  validates :report_year, inclusion: {in: ReportYear::TYPES, allow_blank: true}, presence: true
  validates :widget_type, inclusion: {in: WidgetType::TYPES, allow_blank: true}, presence: true

  validates_uniqueness_of :slug, scope: :report_year
  validates :position, numericality: {greater_than: 0}
  validates :support_filters, inclusion: {in: [true, false]}
  validates_presence_of :slug, :title
end
