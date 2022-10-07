require "swagger_helper"

RSpec.describe "API V1 Funders", type: :request do
  path "/api/v1/funders" do
    get "Returns list of the funders" do
      tags "Funders"
      consumes "application/json"
      produces "application/json"
      parameter name: "filter[subgeographic_ids]", in: :query, type: :array, items: {type: :string}, description: "Filter results only for specified subgeographics", required: false
      parameter name: "filter[geographics]", in: :query, type: :array, items: {type: :string}, description: "Filter results only for specified geographics", required: false
      parameter name: "filter[areas]", in: :query, type: :array, items: {type: :string, enum: Area::TYPES}, description: "Filter results only for specified areas", required: false
      parameter name: "filter[demographics]", in: :query, type: :array, items: {type: :string, enum: Demographic::TYPES}, description: "Filter results only for specified demographics", required: false
      parameter name: "filter[funder_types]", in: :query, type: :array, items: {type: :string, enum: FunderType::TYPES}, description: "Filter results only for specified funder types", required: false
      parameter name: "filter[capital_types]", in: :query, type: :array, items: {type: :string, enum: CapitalType::TYPES}, description: "Filter results only for specified capital types", required: false
      parameter name: "filter[funder_legal_status]", in: :query, type: :string, enum: FunderLegalStatus::TYPES, description: "Filter results only for specified funder legal status", required: false
      parameter name: "fields[funder]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:country) { create :subgeographic, geographic: :countries }
      let!(:national) { create :subgeographic, geographic: :national, parent: country }
      let!(:funders) { create_list :funder, 3, areas: ["equity_and_justice"] }
      let!(:funder) { create :funder, subgeographics: [national], areas: ["food_sovereignty"] }

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

        context "when filtered for specific subgeographics" do
          let("filter[subgeographic_ids]") { [national.id] }

          it "returns only funders with correct subgeographics" do
            expect(response_json["data"].pluck("id")).to eq([funder.id])
          end
        end

        context "when filtered for specific geographics" do
          let("filter[geographics]") { [:national] }

          it "returns only funders with correct geographics" do
            expect(response_json["data"].pluck("id")).to eq([funder.id])
          end
        end

        context "when filtered for specified enums" do
          let("filter[areas]") { ["food_sovereignty"] }

          it "returns only funders at correct areas" do
            expect(response_json["data"].pluck("id")).to eq([funder.id])
          end
        end

        context "when combining multiple filters" do
          let("filter[subgeographic_ids]") { [national.id] }
          let("filter[geographics]") { [:national] }
          let("filter[areas]") { ["food_sovereignty"] }

          it "returns only funders which are true for all filters" do
            expect(response_json["data"].pluck("id")).to eq([funder.id])
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
