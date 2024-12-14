# This file was generated with rails g enum WidgetSlug

require "swagger_helper"

RSpec.describe "API V1 Token", type: :request do
  path "/api/v1/token" do
    post "Returns member access token" do
      tags "Token"
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
          token: {type: :string},
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
