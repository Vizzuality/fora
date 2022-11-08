module API
  module V1
    class WidgetSerializer < BaseSerializer
      attributes :title,
        :report_pages,
        :report_year,
        :widget_type,
        :slug,
        :position,
        :description,
        :created_at,
        :updated_at
    end
  end
end
