require "swagger_helper"

RSpec.describe "API V1 Funders", type: :request do
  path "/api/v1/funders" do
    get "Returns list of the funders" do
      tags "Funders"
      consumes "application/json"
      produces "application/json"
      parameter name: "fields[funder]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:country) { create :subgeographic, geographic: :countries }
      let!(:national) { create :subgeographic, geographic: :national, parent: country }
      let!(:funders) { create_list :funder, 3 }
      let!(:funder) { create :funder, subgeographics: [national] }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/funder"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/funders")
        end

        context "with sparse fieldset" do
          let("fields[funder]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/funders-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[funder]") { "name,primary_office_country,nonexisting" }
          let(:includes) { "primary_office_country" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/funders-include-relationships")
          end
        end
      end
    end
  end

  path "/api/v1/funders/{id}" do
    get "Returns appropriate funder" do
      tags "Funders"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Funder ID"
      parameter name: "fields[funder]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:country) { create :subgeographic, geographic: :countries }
      let!(:national) { create :subgeographic, geographic: :national, parent: country }
      let!(:funder) { create :funder, subgeographics: [national] }
      let(:id) { funder.id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/funder"}}

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-funder")
        end

        context "with sparse fieldset" do
          let("fields[funder]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-funder-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[funder]") { "name,primary_office_country,nonexisting" }
          let(:includes) { "primary_office_country" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-funder-include-relationships")
          end
        end
      end
    end
  end
end
