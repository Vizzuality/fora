# This file was generated with rails g enum ReportYear

require "swagger_helper"

RSpec.describe "API V1 ReportYear", type: :request do
  path "/api/v1/report_years" do
    get "Returns list of the report_years" do
      tags "Enums"
      consumes "application/json"
      produces "application/json"

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/enum"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/report_years", dynamic_attributes: [])
        end
      end
    end
  end
end
