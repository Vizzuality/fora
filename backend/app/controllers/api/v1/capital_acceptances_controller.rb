# This file was generated with rails g enum CapitalAcceptance

module API
  module V1
    class CapitalAcceptancesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::CapitalAcceptanceSerializer.new(@capital_acceptances).serializable_hash
      end
    end
  end
end
