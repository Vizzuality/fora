require "swagger_helper"

RSpec.describe "API V1 Projects", type: :request do
  path "/api/v1/projects" do
    get "Returns list of the projects" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      parameter name: "filter[subgeographics]", in: :query, type: :string, description: "Filter results only for specified subgeographics. Use comma to separate multiple fields", required: false
      parameter name: "filter[geographic]", in: :query, type: :string, description: "Filter results only for specified geographic", required: false
      parameter name: "filter[areas]", in: :query, type: :string, enum: Area::TYPES, description: "Filter results only for specified areas. Use comma to separate multiple fields", required: false
      parameter name: "filter[demographics]", in: :query, type: :string, enum: Demographic::TYPES, description: "Filter results only for specified demographics. Use comma to separate multiple fields", required: false
      parameter name: "filter[recipient_legal_statuses]", in: :query, type: :string, enum: RecipientLegalStatus::TYPES, description: "Filter results only for specified recipient legal status. Use comma to separate multiple fields", required: false
      parameter name: "filter[full_text]", in: :query, type: :string, description: "Filter records by provided text", required: false
      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: "sort[attribute]", in: :query, type: :string, enum: API::V1::ProjectsController::SORTING_COLUMNS, description: "Attributes usable for sorting. Default: created_at", required: false
      parameter name: "sort[direction]", in: :query, type: :string, enum: API::Sorting::SORTING_DIRECTIONS, description: "Possible directions of sorting. Default: desc", required: false
      parameter name: :disable_pagination, in: :query, type: :boolean, description: "Turn off pagination", required: false
      parameter name: "fields[project]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:country) { create :subgeographic, geographic: :countries }
      let!(:national) { create :subgeographic, geographic: :national, parent: country }
      let!(:projects) do
        create_list :project, 3, recipient: create(:recipient, recipient_legal_status: "for_profit")
      end
      let!(:project) do
        create :project, recipient: create(:recipient, subgeographics: [national], recipient_legal_status: "foundation")
      end
      let!(:investment_other) { create :investment, project: projects.first, areas: %w[equity_and_justice] }
      let!(:investment_project) { create :investment, project: project, areas: %w[food_sovereignty] }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/project"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta", :nullable => true},
          links: {"$ref" => "#/components/schemas/pagination_links", :nullable => true}
        }
        let("sort[attribute]") { "name" }
        let("sort[direction]") { "asc" }

        run_test!

        it_behaves_like "with pagination", expected_total: 4

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/projects")
        end

        context "with sparse fieldset" do
          let("fields[project]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/projects-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project]") { "name,subgeographics,funders,nonexisting" }
          let(:includes) { "subgeographics,funders" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/projects-include-relationships")
          end
        end

        context "when disabling pagination" do
          let("page[size]") { 1 }
          let(:disable_pagination) { true }

          it "shows all records" do
            expect(response_json["data"].size).to eq(Project.count)
            expect(response_json["meta"]).to be_nil
            expect(response_json["links"]).to be_nil
          end
        end

        context "when filtered for specific subgeographics" do
          let("filter[subgeographics]") { national.reload.abbreviation }

          it "returns only projects with correct subgeographics" do
            expect(response_json["data"].pluck("id")).to eq([project.id])
          end
        end

        context "when filtered for specific geographics" do
          let("filter[geographic]") { :national }

          it "returns only projects with correct geographics" do
            expect(response_json["data"].pluck("id")).to eq([project.id])
          end
        end

        context "when filtered for specified enums" do
          context "when used with enum from recipient table" do
            let("filter[recipient_legal_statuses]") { "foundation" }

            it "returns only projects with correct recipient_legal_status" do
              expect(response_json["data"].pluck("id")).to eq([project.id])
            end
          end

          context "when used with enum from investment table" do
            let("filter[areas]") { "food_sovereignty" }

            it "returns only projects at correct areas" do
              expect(response_json["data"].pluck("id")).to eq([project.id])
            end
          end
        end

        context "when filtered by full text search" do
          let("filter[full_text]") { project.name }

          it "returns only projects with appropriate name" do
            expect(response_json["data"].pluck("id")).to eq([project.id])
          end
        end

        context "when combining multiple filters" do
          let("filter[subgeographics]") { national.abbreviation }
          let("filter[geographic]") { :national }
          let("filter[areas]") { "food_sovereignty" }
          let("filter[recipient_legal_statuses]") { "foundation" }
          let("filter[full_text]") { project.name }

          it "returns only projects which are true for all filters" do
            expect(response_json["data"].pluck("id")).to eq([project.id])
          end
        end

        context "when sorting by funders count" do
          let(:project_1) { projects.first }
          let(:project_2) { project }
          let!(:investments_1) { create_list :investment, 2, project: project_1 }
          let!(:investments_2) { create_list :investment, 1, project: project_2 }

          let("sort[attribute]") { "funders_count" }
          let("sort[direction]") { "desc" }

          run_test!

          it "returns correctly sorted result" do
            expect(response_json["data"].first["id"]).to eq(project_1.id)
            expect(response_json["data"].second["id"]).to eq(project_2.id)
          end
        end
      end
    end
  end

  path "/api/v1/projects/{id}" do
    get "Returns appropriate project" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Project ID"
      parameter name: "fields[project]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:country) { create :subgeographic, geographic: :countries }
      let!(:national) { create :subgeographic, geographic: :national, parent: country }
      let!(:project) { create :project, recipient: create(:recipient, subgeographics: [national]) }
      let(:id) { project.id }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/project"}}

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-project")
        end

        context "with sparse fieldset" do
          let("fields[project]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project]") { "name,subgeographic_ancestors,nonexisting" }
          let(:includes) { "subgeographic_ancestors" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-project-include-relationships")
          end
        end
      end
    end
  end
end
