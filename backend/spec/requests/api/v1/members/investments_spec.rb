require "swagger_helper"

RSpec.describe "API V1 Member Investments", type: :request do
  path "/api/v1/members/investments" do
    get "List all investments for current member" do
      tags "Investments"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      include_context "with authorization"


      parameter name: "page[number]", in: :query, type: :integer, description: "Page number. Default: 1", required: false
      parameter name: "page[size]", in: :query, type: :integer, description: "Per page items. Default: 10", required: false
      parameter name: :disable_pagination, in: :query, type: :boolean, description: "Turn off pagination", required: false
      parameter name: "fields[investment]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:member) { create :member }
      let!(:investments) { create_list(:investment, 3, funder: member.funder) }
      let!(:investment_of_other_member) { create :investment }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/investment"}},
          meta: {"$ref" => "#/components/schemas/pagination_meta", :nullable => true},
          links: {"$ref" => "#/components/schemas/pagination_links", :nullable => true}
        }

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/investments")
        end

        it "excludes investments of other members" do
          expect(response_json["data"].count).to eq(investments.count)
        end

        context "with sparse fieldset" do
          let("fields[investment]") { "amount,project,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/investments-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[investment]") { "amount,project,nonexisting" }
          let(:includes) { "project" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/investments-include-relationships")
          end
        end

        context "when disabling pagination" do
          let("page[size]") { 1 }
          let(:disable_pagination) { true }

          it "shows all records" do
            expect(response_json["data"].size).to eq(member.investments.count)
            expect(response_json["meta"]).to be_nil
            expect(response_json["links"]).to be_nil
          end
        end
      end
    end

    post "Create a new investment for current member" do
      tags "Investments"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      include_context "with authorization"

      parameter name: :investment_params, in: :body, schema: {
        type: :object,
        properties: {
          amount: {type: :number},
          project_id: {type: :string},
          year_invested: {type: :integer},
          initial_funded_year: {type: :integer},
          funding_type: {type: :string, nullable: true},
          funding_type_other: {type: :string, nullable: true},
          areas: {type: :array, items: {type: :string}},
          areas_other: {type: :string, nullable: true},
          grant_duration: {type: :integer},
          number_of_grant_years: {type: :integer, nullable: true},
          demographics: {type: :array, items: {type: :string}, nullable: true},
          demographics_other: {type: :string, nullable: true},
          capital_type: {type: :string},
          capital_type_other: {type: :string, nullable: true},
          submitting_organization_contact_name: {type: :string},
          privacy: {type: :string}
        },
        required: %w[amount project_id year_invested initial_funded_year areas grant_duration capital_type privacy]
      }

      let(:member) { create :member }
      let(:investment_params) {}

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/investment"}}

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:project) { create :project }
        let(:investment_params) { build(:investment).attributes.merge project_id: project.id }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/create-investment")
        end
      end

      response "422", "Invalid attributes" do
        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:investment_params) { {amount: nil} }

        run_test!

        it "returns error message" do
          expect(response_json["errors"].first["title"]).to include("Amount is not a number")
        end
      end
    end
  end

  path "/api/v1/members/investments/{id}" do
    get "Show investment details for current member" do
      tags "Investments"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      include_context "with authorization"

      parameter name: :id, in: :path, type: :string, description: "Investment ID", required: true
      parameter name: "fields[investment]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:member) { create :member }
      let!(:investment) { create :investment, funder: member.funder }
      let!(:investment_of_other_member) { create :investment }
      let(:id) { investment.id }

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/investment"}}

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/get-investment")
        end

        it "excludes investment of other member" do
          expect(response_json["data"]["id"]).to eq(investment.id)
        end

        context "with sparse fieldset" do
          let("fields[investment]") { "amount,project,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/get-investment-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[investment]") { "amount,project,nonexisting" }
          let(:includes) { "project" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/get-investment-include-relationships")
          end
        end
      end
    end

    put "Update investment details for current member" do
      tags "Investments"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      include_context "with authorization"

      parameter name: :id, in: :path, type: :string, description: "Investment ID", required: true
      parameter name: :investment_params, in: :body, schema: {
        type: :object,
        properties: {
          amount: {type: :number},
          project_id: {type: :string},
          year_invested: {type: :integer},
          initial_funded_year: {type: :integer},
          funding_type: {type: :string, nullable: true},
          funding_type_other: {type: :string, nullable: true},
          areas: {type: :array, items: {type: :string}},
          areas_other: {type: :string, nullable: true},
          grant_duration: {type: :integer},
          number_of_grant_years: {type: :integer, nullable: true},
          demographics: {type: :array, items: {type: :string}, nullable: true},
          demographics_other: {type: :string, nullable: true},
          capital_type: {type: :string},
          capital_type_other: {type: :string, nullable: true},
          submitting_organization_contact_name: {type: :string},
          privacy: {type: :string}
        }
      }

      let(:member) { create :member }
      let!(:investment) { create :investment, funder: member.funder }
      let!(:investment_of_other_member) { create :investment }
      let(:id) { investment.id }
      let(:investment_params) {}

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/investment"}}

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:investment_params) do
          {
            amount: 100,
            project_id: create(:project).id,
            year_invested: 2020,
            initial_funded_year: 2020,
            areas: ["equity_and_justice"],
            grant_duration: "one_year",
            capital_type: "debt",
            privacy: "all"
          }
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/update-investment")
        end
      end

      response "403", "Cannot update investment of different member" do
        schema "$ref" => "#/components/schemas/errors"

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:id) { investment_of_other_member.id }

        run_test!
      end

      response "422", "Invalid attributes" do
        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:investment_params) { {amount: nil} }

        run_test!

        it "returns error message" do
          expect(response_json["errors"].first["title"]).to eq("Amount is not a number")
        end
      end
    end

    delete "Delete investment for current member" do
      tags "Investments"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      include_context "with authorization"

      parameter name: :id, in: :path, type: :string, description: "Investment ID", required: true

      let(:member) { create :member }
      let!(:investment) { create :investment, funder: member.funder }
      let!(:investment_of_other_member) { create :investment }
      let(:id) { investment.id }

      response "200", :success do
        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }

        run_test!
      end

      response "403", "Cannot delete investment of another user" do
        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:id) { investment_of_other_member.id }

        run_test!
      end
    end
  end
end
