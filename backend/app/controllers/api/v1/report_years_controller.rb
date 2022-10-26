# This file was generated with rails g enum ReportYear

module API
  module V1
    class ReportYearsController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::ReportYearSerializer.new(@report_years.sort_by(&:name)).serializable_hash
      end
    end
  end
end
