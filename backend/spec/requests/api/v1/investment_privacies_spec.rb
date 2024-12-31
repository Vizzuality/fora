# This file was generated with rails g enum InvestmentPrivacy

require "swagger_helper"

RSpec.describe "API V1 InvestmentPrivacy", type: :request do
  path "/api/v1/investment_privacies" do
    get "Returns list of the investment_privacies" do
      tags "Enums"
      consumes "application/json"
      produces "application/json"

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/enum"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/investment_privacies", dynamic_attributes: [])
        end
      end
    end
  end
end
