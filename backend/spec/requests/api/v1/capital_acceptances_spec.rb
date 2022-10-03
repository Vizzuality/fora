# This file was generated with rails g enum CapitalAcceptance

require "swagger_helper"

RSpec.describe "API V1 CapitalAcceptance", type: :request do
  path "/api/v1/capital_acceptances" do
    get "Returns list of the capital_acceptances" do
      tags "Enums"
      consumes "application/json"
      produces "application/json"

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/enum"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/capital_acceptances", dynamic_attributes: [])
        end
      end
    end
  end
end
