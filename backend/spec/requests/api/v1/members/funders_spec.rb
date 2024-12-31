require "swagger_helper"

RSpec.describe "API V1 Member Funder", type: :request do
  path "/api/v1/members/funder" do
    get "Returns funder of current member" do
      tags "Funders"
      consumes "application/json"
      produces "application/json"
      security [Bearer: {}]

      include_context "with authorization"

      parameter name: "fields[funder]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let!(:member) { create :member }

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/funder"}}

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/get-funder")
        end

        context "with sparse fieldset" do
          let("fields[funder]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/get-funder-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[funder]") { "name,primary_office_country,nonexisting" }
          let(:includes) { "primary_office_country" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/get-funder-include-relationships")
          end
        end
      end
    end

    put "Updates funder of current member" do
      tags "Funders"
      consumes "multipart/form-data"
      produces "application/json"
      security [Bearer: {}]

      include_context "with authorization"

      parameter name: :funder_params, in: :formData, schema: {
        type: :object,
        properties: {
          name: {type: :string},
          description: {type: :string},
          logo: {type: :binary},
          primary_office_address: {type: :string},
          primary_office_city: {type: :string},
          primary_office_state_id: {type: :integer},
          primary_office_country_id: {type: :integer},
          primary_contact_first_name: {type: :string},
          primary_contact_last_name: {type: :string},
          primary_contact_email: {type: :string},
          show_primary_email: {type: :boolean},
          primary_contact_phone: {type: :string},
          primary_contact_location: {type: :string},
          primary_contact_role: {type: :string},
          secondary_email_which_can_be_shared: {type: :string},
          website: {type: :string},
          date_joined_fora: {type: :string},
          funder_type: {type: :string},
          funder_type_other: {type: :string},
          capital_acceptances_other: {type: :string},
          leadership_demographics_other: {type: :string},
          number_staff_employees: {type: :integer},
          application_status: {type: :string},
          funder_legal_status: {type: :string},
          funder_legal_status_other: {type: :string},
          new_to_regenerative_ag: {type: :boolean},
          networks: {type: :string},
          capital_types_other: {type: :string},
          spend_down_strategy: {type: :string},
          areas_other: {type: :string},
          demographics_other: {type: :string},
          capital_acceptances: {type: :array, items: {type: :string}},
          leadership_demographics: {type: :array, items: {type: :string}},
          capital_types: {type: :array, items: {type: :string}},
          areas: {type: :array, items: {type: :string}},
          demographics: {type: :array, items: {type: :string}}
        },
        required: %w[name description primary_office_city primary_contact_first_name primary_contact_last_name" \
          "primary_contact_email date_joined_fora number_staff_employees funder_type capital_acceptances" \
          "leadership_demographics application_status funder_legal_status capital_types areas demographics " \
          "primary_office_country_id]
      }
      parameter name: "fields[funder]", in: :formData, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :formData, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:funder_params) {}
      let(:member) { create :member }

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/funder"}}

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:funder) { create :funder }
        let(:funder_params) {
          funder.attributes.except("id").merge(
            name: "New name",
            logo: fixture_file_upload("spec/fixtures/files/picture.jpg")
          )
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/members/update-funder")
        end

        context "with sparse fieldset" do
          let("fields[funder]") { "name,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/update-funder-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[funder]") { "name,primary_office_country,nonexisting" }
          let(:includes) { "primary_office_country" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/members/update-funder-include-relationships")
          end
        end
      end

      response "422", "Invalid attributes" do
        schema "$ref" => "#/components/schemas/errors"

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:funder_params) { {name: ""} }

        run_test!
      end
    end
  end
end
