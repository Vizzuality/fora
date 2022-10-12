# This file was generated with rails g enum FundingType

require "swagger_helper"

RSpec.describe "API V1 FundingType", type: :request do
  path "/api/v1/funding_types" do
    get "Returns list of the funding_types" do
      tags "Enums"
      consumes "application/json"
      produces "application/json"

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/enum"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/funding_types", dynamic_attributes: [])
        end
      end
    end
  end
end
