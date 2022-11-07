module API
  module V1
    class WidgetDataSerializer < BaseSerializer
      attributes :title,
        :data
    end
  end
end
