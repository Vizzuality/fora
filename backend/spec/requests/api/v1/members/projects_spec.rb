require "swagger_helper"

RSpec.describe "API V1 Member Projects", type: :request do
  path "/api/v1/members/projects" do
    get "List all projects for current member" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      security [Bearer: {}]

      include_context "with authorization"

      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: :disable_pagination, in: :query, type: :boolean, description: "Turn off pagination", required: false
      parameter name: "fields[project]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let!(:member) { create :member }
      let!(:projects) do
        create_list :project, 3, recipient: create(:recipient, recipient_legal_status: "for_profit"), member: member
      end
      let!(:project_of_different_member) do
        create :project, recipient: create(:recipient, recipient_legal_status: "government_organization")
      end

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/project"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta", :nullable => true},
          links: {"$ref" => "#/components/schemas/pagination_links", :nullable => true}
        }

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }

        run_test!

        it_behaves_like "with pagination", expected_total: 3

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/projects")
        end

        context "with sparse fieldset" do
          let("fields[project]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/projects-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project]") { "name,subgeographics,funders,nonexisting" }
          let(:includes) { "subgeographics,funders" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/projects-include-relationships")
          end
        end

        context "when disabling pagination" do
          let("page[size]") { 1 }
          let(:disable_pagination) { true }

          it "shows all records" do
            expect(response_json["data"].size).to eq(Project.where(member: member).count)
            expect(response_json["meta"]).to be_nil
            expect(response_json["links"]).to be_nil
          end
        end
      end
    end

    post "Create a project for current member" do
      tags "Projects"
      consumes "multipart/form-data"
      produces "application/json"
      security [Bearer: {}]

      include_context "with authorization"

      parameter name: :project_params, in: :formData, schema: {
        type: :object,
        properties: {
          name: {type: :string},
          description: {type: :string},
          logo: {type: :binary},
          contact_first_name: {type: :string},
          contact_last_name: {type: :string},
          website: {type: :string},
          country_id: {type: :integer},
          state_id: {type: :integer},
          city: {type: :string},
          leadership_demographics_other: {type: :string},
          recipient_legal_status: {type: :string},
          leadership_demographics: {type: :array, items: {type: :string}}
        },
        required: %w[name description contact_first_name contact_last_name country_id city recipient_legal_status]
      }
      parameter name: "fields[project]", in: :formData, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :formData, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let!(:member) { create :member }
      let(:project_params) {}

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/project"}}

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:project_params) do
          {
            name: "New Project",
            description: "Description",
            logo: fixture_file_upload("spec/fixtures/files/picture.jpg"),
            contact_first_name: "John",
            contact_last_name: "Doe",
            website: "https://example.com",
            country_id: create(:subgeographic, geographic: :countries).id,
            state_id: create(:subgeographic, geographic: :national).id,
            city: "City",
            leadership_demographics_other: "Something specific",
            leadership_demographics: %w[black_or_african_american other],
            recipient_legal_status: "for_profit"
          }
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/create-project")
        end
      end

      response "422", "Invalid attributes" do
        schema "$ref" => "#/components/schemas/errors"

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:project_params) { {name: ""} }

        run_test!
      end
    end
  end

  path "/api/v1/members/projects/{id}" do
    get "Show selected project for current member" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      security [Bearer: {}]

      include_context "with authorization"

      parameter name: :id, in: :path, type: :string, description: "Project ID", required: true
      parameter name: "fields[project]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let!(:member) { create :member }
      let!(:project) { create :project, recipient: create(:recipient, recipient_legal_status: "for_profit"), member: member }
      let!(:project_of_different_member) do
        create :project, recipient: create(:recipient, recipient_legal_status: "government_organization")
      end
      let(:id) { project.id }

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/project"}}

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/get-project")
        end

        context "with sparse fieldset" do
          let("fields[project]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/get-project-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project]") { "name,subgeographics,funders,nonexisting" }
          let(:includes) { "subgeographics,funders" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/get-project-include-relationships")
          end
        end
      end

      response "404", "Not found" do
        schema "$ref" => "#/components/schemas/errors"

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:id) { project_of_different_member.id }

        run_test!
      end
    end

    put "Update selected project for current member" do
      tags "Projects"
      consumes "multipart/form-data"
      produces "application/json"
      security [Bearer: {}]

      include_context "with authorization"

      parameter name: :id, in: :path, type: :string, description: "Project ID", required: true
      parameter name: :project_params, in: :formData, schema: {
        type: :object,
        properties: {
          name: {type: :string},
          description: {type: :string},
          logo: {type: :binary},
          contact_first_name: {type: :string},
          contact_last_name: {type: :string},
          website: {type: :string},
          country_id: {type: :integer},
          state_id: {type: :integer},
          city: {type: :string},
          leadership_demographics_other: {type: :string},
          recipient_legal_status: {type: :string},
          leadership_demographics: {type: :array, items: {type: :string}}
        }
      }
      parameter name: "fields[project]", in: :formData, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :formData, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let!(:member) { create :member }
      let!(:project) { create :project, recipient: create(:recipient, recipient_legal_status: "for_profit"), member: member }
      let!(:project_of_different_member) do
        create :project, recipient: create(:recipient, recipient_legal_status: "government_organization")
      end
      let(:id) { project.id }
      let(:project_params) {}

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/project"}}

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:project_params) do
          {
            name: "Updated Project",
            description: "Description",
            logo: fixture_file_upload("spec/fixtures/files/picture.jpg"),
            contact_first_name: "John",
            contact_last_name: "Doe",
            website: "https://example.com",
            country_id: create(:subgeographic, geographic: :countries).id,
            state_id: create(:subgeographic, geographic: :national).id,
            city: "City",
            leadership_demographics_other: "Something specific",
            leadership_demographics: %w[black_or_african_american other],
            recipient_legal_status: "for_profit"
          }
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/update-project")
        end

        context "with sparse fieldset" do
          let("fields[project]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/update-project-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[project]") { "name,subgeographics,funders,nonexisting" }
          let(:includes) { "subgeographics,funders" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/update-project-include-relationships")
          end
        end
      end

      response "403", "Cannot update project of different member" do
        schema "$ref" => "#/components/schemas/errors"

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:id) { project_of_different_member.id }

        run_test!
      end

      response "422", "Invalid attributes" do
        schema "$ref" => "#/components/schemas/errors"

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:project_params) { {name: ""} }

        run_test!
      end
    end

    delete "Delete selected project for current member" do
      tags "Projects"
      consumes "application/json"
      produces "application/json"
      security [Bearer: {}]

      include_context "with authorization"

      parameter name: :id, in: :path, type: :string, description: "Project ID", required: true

      let!(:member) { create :member }
      let!(:project) { create :project, recipient: create(:recipient, recipient_legal_status: "for_profit"), member: member }
      let!(:project_of_different_member) do
        create :project, recipient: create(:recipient, recipient_legal_status: "government_organization")
      end
      let(:id) { project.id }

      response "200", :success do
        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }

        run_test!
      end

      response "403", "Cannot delete project of different member" do
        schema "$ref" => "#/components/schemas/errors"

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:id) { project_of_different_member.id }

        run_test!
      end

      response "422", "Project with investments cannot be deleted" do
        schema "$ref" => "#/components/schemas/errors"

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let!(:investment) { create :investment, project: project }

        run_test!
      end
    end
  end
end
