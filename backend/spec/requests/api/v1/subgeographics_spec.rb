require "swagger_helper"

RSpec.describe "API V1 Subgeographics", type: :request do
  path "/api/v1/subgeographics" do
    get "Returns list of the subgeographics" do
      tags "Subgeographics"
      consumes "application/json"
      produces "application/json"
      parameter name: "filter[geographic]", in: :query, type: :string, description: "Filter records by its geographic", required: false
      parameter name: "filter[only_active]", in: :query, type: :boolean, description: "Returns only subgeographics which are used by at least one funder or recipient (project)", required: false
      parameter name: "fields[subgeographic]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false
      parameter name: :includes, in: :query, type: :string, description: "Include relationships. Use comma to separate multiple fields", required: false

      let!(:country) { create :subgeographic, geographic: :countries }
      let!(:region) { create :subgeographic, geographic: :regions, parent: country }
      let!(:funder) { create :funder, subgeographics: [country], primary_office_country: country, primary_office_state: nil }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/subgeographic"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/subgeographics")
        end

        context "with sparse fieldset" do
          let("fields[subgeographic]") { "name,code,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/subgeographics-sparse-fieldset")
          end
        end

        context "with relationships" do
          let("fields[subgeographic]") { "name,parent" }
          let(:includes) { "parent" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/subgeographics-include-relationships")
          end
        end

        context "with geographic filter" do
          let("filter[geographic]") { "regions" }

          it "contains just region subgeographic" do
            expect(response_json["data"].pluck("id")).to eq([region.id])
          end
        end

        context "with only active filter" do
          let("filter[only_active]") { true }

          it "contains just country subgeographic" do
            expect(response_json["data"].pluck("id")).to eq([country.id])
          end
        end

        context "when combining multiple filters" do
          let("filter[geographic]") { "countries" }
          let("filter[only_active]") { true }

          it "contains just expected subgeographic" do
            expect(response_json["data"].pluck("id")).to eq([country.id])
          end
        end
      end
    end
  end

  path "/api/v1/subgeographics/geojson" do
    get "Returns geojson for appropriate geographic" do
      tags "Subgeographics"
      consumes "application/json"
      produces "application/json"
      parameter name: "filter[geographic]", in: :query, type: :string, description: "Return geojson for specific geographic", required: true

      let!(:country) { create :subgeographic, geographic: :countries }
      let!(:region_1) { create :subgeographic, geographic: :regions, parent: country }
      let!(:region_2) { create :subgeographic, geographic: :regions, parent: country }

      let("filter[geographic]") { :regions }

      response "200", :success do
        schema "$ref" => "#/components/schemas/subgeographic_geojson"

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/subgeographics-geojson")
        end
      end

      response "422", "Missing geographic param" do
        schema "$ref" => "#/components/schemas/errors"

        let("filter[geographic]") {}

        run_test!

        it "returns correct error", generate_swagger_example: true do
          expect(response_json["errors"][0]["title"]).to eq(I18n.t("api.errors.missing_geographic"))
        end
      end
    end
  end
end
