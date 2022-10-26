# This file was generated with rails g enum ReportPage

module API
  module V1
    class ReportPagesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::ReportPageSerializer.new(@report_pages.sort_by(&:name)).serializable_hash
      end
    end
  end
end
