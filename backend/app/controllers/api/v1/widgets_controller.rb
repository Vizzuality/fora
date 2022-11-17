module API
  module V1
    class WidgetsController < BaseController
      mandatory_attributes({filter: [:report_page]}, only: :index)
      mandatory_attributes({filter: [:report_year]})

      before_action :fetch_widget, only: %i[show download]
      load_and_authorize_resource

      def index
        @widgets = @widgets.where "report_pages && ARRAY[?]::varchar[]", Array.wrap(filter_params[:report_page])
        @widgets = @widgets.where report_year: filter_params[:report_year]
        @widgets = @widgets.where widget_type: filter_params[:widget_type] if filter_params[:widget_type].present?
        @widgets = @widgets.order position: :asc
        render json: WidgetSerializer.new(
          @widgets,
          fields: sparse_fieldset,
          params: {current_user: current_user, current_ability: current_ability}
        ).serializable_hash
      end

      def show
        widget_data = WidgetData.new widget: @widget, filters: filter_params
        render json: WidgetDataSerializer.new(
          widget_data,
          params: {current_user: current_user, current_ability: current_ability}
        ).serializable_hash
      end

      def download
        widget_data = WidgetData.new widget: @widget, filters: filter_params
        send_data widget_data.to_csv, filename: "FORA: #{widget_data.title}.csv"
      end

      private

      def fetch_widget
        @widget = Widget.find_by! slug: params[:id], report_year: filter_params[:report_year]
      end

      def filter_params
        params.fetch(:filter, {}).permit :report_year, :report_page, :widget_type, :areas, :geographic, :subgeographics, :demographics
      end
    end
  end
end
