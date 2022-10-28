class WidgetData < ApplicationRecord
  belongs_to :widget

  validates_uniqueness_of :filter_key, scope: :widget_id
  validates_presence_of :data
end
