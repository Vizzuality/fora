# This file was generated with rails g enum FunderLegalStatus

require "swagger_helper"

RSpec.describe "API V1 FunderLegalStatus", type: :request do
  path "/api/v1/funder_legal_statuses" do
    get "Returns list of the funder_legal_statuses" do
      tags "Enums"
      consumes "application/json"
      produces "application/json"

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/enum"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/funder_legal_statuses", dynamic_attributes: [])
        end
      end
    end
  end
end
