# This file was generated with rails g enum WidgetSlug

require "swagger_helper"

RSpec.describe "API V1 Members", type: :request do
  path "/api/v1/member" do
    get "Returns current member" do
      tags "Member"
      consumes "application/json"
      produces "application/json"
      security [Bearer: {}]
      parameter name: "fields[member]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      include_context "with authorization"

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/member"}}

        let(:member) { create :member }
        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-member")
        end

        context "with sparse fieldset" do
          let("fields[member]") { "first_name,email,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-member-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[member]") { "first_name,funder,nonexisting" }
          let(:includes) { "funder" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/get-member-include-relationships")
          end
        end
      end
    end

    put "Updates a current member" do
      tags "Member"
      consumes "application/json"
      produces "application/json"
      security [Bearer: {}]

      include_context "with authorization"

      parameter name: :id, in: :path, type: :string
      parameter name: :member_params, in: :body, schema: {
        type: :object,
        properties: {
          first_name: {type: :string, nullable: true},
          last_name: {type: :string, nullable: true},
          email: {type: :string, nullable: true},
          password: {type: :string, nullable: true},
          password_confirmation: {type: :string, nullable: true}
        }
      }
      parameter name: "fields[member]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let(:member) { create :member }
      let(:id) { member.id }
      let(:member_params) { {} }

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/member"}}

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:member_params) do
          {
            first_name: "New",
            last_name: "Name",
            email: "new@email.test"
          }
        end

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/update-member")
        end

        context "when updating password" do
          let!(:old_password) { member.encrypted_password }
          let(:member_params) do
            {
              password: "NewPassword123456",
              password_confirmation: "NewPassword123456"
            }
          end

          it "returns 200" do
            expect(response).to have_http_status(:ok)
            expect(member.reload.encrypted_password).not_to eq(old_password)
          end
        end
      end

      response "422", "Invalid attributes" do
        schema "$ref" => "#/components/schemas/errors"

        let(:Authorization) { "Bearer #{JWTAuth.encode(member)}" }
        let(:member_params) do
          {
            email: "invalid-email"
          }
        end

        run_test!
      end
    end
  end

  path "/api/v1/member/sign_in" do
    post "Returns member access token" do
      tags "Member"
      consumes "application/json"
      produces "application/json"
      parameter name: :member_params, in: :body, schema: {
        type: :object,
        properties: {
          email: {type: :string},
          password: {type: :string}
        },
        required: ["email", "password"]
      }

      response "200", :success do
        schema type: :object, properties: {
          token: {type: :string}
        }

        let(:member) { create :member, password: password }
        let(:password) { "SuperSecret6" }
        let(:member_params) do
          {
            email: member.email,
            password: password
          }
        end

        run_test!

        it "returns token", generate_swagger_example: true do
          expect(response_json["token"]).not_to be_nil
        end
      end

      response "422", "Invalid credentials" do
        schema "$ref" => "#/components/schemas/errors"

        let(:member_params) do
          {
            email: "wrong@email.com",
            password: "wrongpassword"
          }
        end

        run_test!
      end
    end
  end
end
