# This file was generated with rails g enum InvestmentPrivacy

module API
  module V1
    class InvestmentPrivaciesController < BaseController
      load_and_authorize_resource

      def index
        render json: API::V1::Enums::InvestmentPrivacySerializer.new(@investment_privacies.sort_by(&:name)).serializable_hash
      end
    end
  end
end
