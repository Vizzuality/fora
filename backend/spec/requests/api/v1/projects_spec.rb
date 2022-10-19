require "swagger_helper"

RSpec.describe "API V1 Projects", type: :request do
  path "/api/v1/projects" do
    get "Returns list of the projects" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      parameter name: "fields[project]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:country) { create :subgeographic, geographic: :countries }
      let!(:national) { create :subgeographic, geographic: :national, parent: country }
      let!(:projects) { create_list :project, 3 }
      let!(:project) { create :project, recipient: create(:recipient, subgeographics: [national]) }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/project"}}
        }

        run_test!

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
          let("fields[project]") { "name,subgeographics,nonexisting" }
          let(:includes) { "subgeographics" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/projects-include-relationships")
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
