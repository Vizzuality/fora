# This file was generated with rails g enum Role

require "swagger_helper"

RSpec.describe "API V1 Subgeographics", type: :request do
  path "/api/v1/subgeographics" do
    get "Returns list of the subgeographics" do
      tags "Subgeographics"
      consumes "application/json"
      produces "application/json"
      parameter name: "filter[geographic]", in: :query, type: :boolean, description: "Filter records by its geographic", required: false
      parameter name: "fields[subgeographic]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let!(:country) { create :subgeographic, geographic: :countries }
      let!(:region) { create :subgeographic, geographic: :regions, parent: country }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/subgeographic"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/subgeographics")
        end

        context "with sparse fieldset" do
          let("fields[subgeographic]") { "name,code,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/subgeographics-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[subgeographic]") { "name,parent" }
          let(:includes) { "parent" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/subgeographics-include-relationships")
          end
        end

        context "with geographic filter" do
          let("filter[geographic]") { "regions" }

          it "contains just region subgeographic" do
            expect(response_json["data"].pluck("id")).to eq([region.id])
          end
        end
      end
    end
  end
end
