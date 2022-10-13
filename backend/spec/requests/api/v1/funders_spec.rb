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
      parameter name: "filter[full_text]", in: :query, type: :string, description: "Filter records by provided text", required: false
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "sort[attribute]", in: :query, type: :string, enum: API::V1::FundersController::SORTING_COLUMNS, description: "Attributes usable for sorting. Default: created_at", required: false
      parameter name: "sort[direction]", in: :query, type: :string, enum: API::Sorting::SORTING_DIRECTIONS, description: "Possible directions of sorting. Default: desc", required: false
      parameter name: :disable_pagination, in: :query, type: :boolean, description: "Turn off pagination", required: false
      parameter name: "fields[funder]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:country) { create :subgeographic, geographic: :countries }
      let!(:national) { create :subgeographic, geographic: :national, parent: country }
      let!(:funders) { create_list :funder, 3, areas: ["equity_and_justice"] }
      let!(:funder) { create :funder, subgeographics: [national], areas: ["food_sovereignty"] }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/funder"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta", :nullable => true},
          links: {"$ref" => "#/components/schemas/pagination_links", :nullable => true}
        }
        let("sort[attribute]") { "name" }
        let("sort[direction]") { "asc" }

        run_test!

        it_behaves_like "with pagination", expected_total: 4

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

        context "when disabling pagination" do
          let("page[size]") { 1 }
          let(:disable_pagination) { true }

          it "shows all records" do
            expect(response_json["data"].size).to eq(Funder.count)
            expect(response_json["meta"]).to be_nil
            expect(response_json["links"]).to be_nil
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

        context "when filtered by full text search" do
          let("filter[full_text]") { funder.name }

          it "returns only funders at correct areas" do
            expect(response_json["data"].pluck("id")).to eq([funder.id])
          end
        end

        context "when combining multiple filters" do
          let("filter[subgeographic_ids]") { [national.id] }
          let("filter[geographics]") { [:national] }
          let("filter[areas]") { ["food_sovereignty"] }
          let("filter[full_text]") { funder.name }

          it "returns only funders which are true for all filters" do
            expect(response_json["data"].pluck("id")).to eq([funder.id])
          end
        end

        context "when sorting by projects count" do
          let(:funder_1) { funders.second }
          let(:funder_2) { funders.first }
          let(:funder_3) { funder }
          let!(:investments_1) { create_list :investment, 3, funder: funder_1 }
          let!(:investments_2) { create_list :investment, 2, funder: funder_2 }
          let!(:investments_3) { create_list :investment, 1, funder: funder_3 }

          let("sort[attribute]") { "projects_count" }
          let("sort[direction]") { "desc" }

          run_test!

          it "returns correctly sorted result" do
            expect(response_json["data"].first["id"]).to eq(funder_1.id)
            expect(response_json["data"].second["id"]).to eq(funder_2.id)
            expect(response_json["data"].third["id"]).to eq(funder_3.id)
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
