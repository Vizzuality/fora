require "swagger_helper"

RSpec.describe "API V1 Widgets", type: :request do
  path "/api/v1/widgets" do
    get "Returns list of the widgets" do
      tags "Widgets"
      consumes "application/json"
      produces "application/json"
      parameter name: "filter[report_page]", in: :query, type: :string, enum: ReportPage::TYPES, description: "Get widgets only for specified report page", required: true
      parameter name: "filter[report_year]", in: :query, type: :number, enum: ReportYear::TYPES, description: "Get widgets only for specified report year", required: true
      parameter name: "filter[widget_type]", in: :query, type: :string, enum: WidgetType::TYPES, description: "Filter results only for specified widget type", required: false
      parameter name: "fields[widget]", in: :query, type: :string, description: "Get only required fields. Use comma to separate multiple fields", required: false

      let!(:widget_1) { create :widget, report_pages: ["general_report"], report_year: 2021, widget_type: "diagram" }
      let!(:widget_2) { create :widget, report_pages: ["general_report"], report_year: 2021, widget_type: "table" }
      let!(:widget_3) { create :widget, report_pages: ["disparities_report"], report_year: 2021, widget_type: "diagram" }
      let("filter[report_page]") { "general_report" }
      let("filter[report_year]") { 2021 }

      response "200", :success do
        schema type: :object, properties: {
          data: {type: :array, items: {"$ref" => "#/components/schemas/widget"}}
        }

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/widgets")
        end

        context "with sparse fieldset" do
          let("fields[widget]") { "title,description,nonexisting" }

          it "matches snapshot" do
            expect(response.body).to match_snapshot("api/v1/widgets-sparse-fieldset")
          end
        end

        context "when filtered by widget_type" do
          let("filter[widget_type]") { "diagram" }

          it "contains only correct widgets" do
            expect(response_json["data"].pluck("id")).to eq([widget_1.id])
          end
        end
      end
    end
  end

  path "/api/v1/widgets/{slug}" do
    get "Returns appropriate data for widget" do
      tags "Widgets"
      consumes "application/json"
      produces "application/json"
      parameter name: :slug, in: :path, type: :string, description: "Slug of Widget"
      parameter name: "filter[report_year]", in: :query, type: :number, enum: ReportYear::TYPES, description: "Get widgets only for specified report year", required: true
      parameter name: "filter[subgeographics]", in: :query, type: :string, description: "Filter results only for specified subgeographics. Use comma to separate multiple fields", required: false
      parameter name: "filter[areas]", in: :query, type: :string, enum: Area::TYPES, description: "Filter results only for specified areas. Use comma to separate multiple fields", required: false
      parameter name: "filter[demographics]", in: :query, type: :string, enum: Demographic::TYPES, description: "Filter results only for specified demographics. Use comma to separate multiple fields", required: false

      let!(:widget) { create :widget, report_pages: ["general_report"], report_year: 2021, slug: "summary", widget_type: "total" }
      let!(:investment) { create :investment, year_invested: 2021 }
      let(:slug) { widget.slug }
      let("filter[report_year]") { 2021 }

      it_behaves_like "with not found error"

      response "200", :success do
        schema type: :object, properties: {data: {"$ref" => "#/components/schemas/widget_data"}}

        run_test!

        it "matches snapshot", generate_swagger_example: true do
          expect(response.body).to match_snapshot("api/v1/get-widget-data")
        end
      end
    end
  end

  path "/api/v1/widgets/{slug}/download" do
    get "Returns appropriate csv file with widget data" do
      tags "Widgets"
      consumes "application/json"
      produces "text/csv"
      parameter name: :slug, in: :path, type: :string, description: "Slug of Widget"
      parameter name: "filter[report_year]", in: :query, type: :number, enum: ReportYear::TYPES, description: "Get widgets only for specified report year", required: true
      parameter name: "filter[subgeographics]", in: :query, type: :string, description: "Filter results only for specified subgeographics. Use comma to separate multiple fields", required: false
      parameter name: "filter[areas]", in: :query, type: :string, enum: Area::TYPES, description: "Filter results only for specified areas. Use comma to separate multiple fields", required: false
      parameter name: "filter[demographics]", in: :query, type: :string, enum: Demographic::TYPES, description: "Filter results only for specified demographics. Use comma to separate multiple fields", required: false

      let!(:widget) { create :widget, report_pages: ["general_report"], report_year: 2021, slug: "summary", widget_type: "total" }
      let!(:investment) { create :investment, year_invested: 2021 }
      let(:slug) { widget.slug }
      let("filter[report_year]") { 2021 }

      it_behaves_like "with not found error"

      response "200", :success do
        run_test!

        it "returns correct csv file" do
          expect(response.body).to eq(WidgetData.new(widget: widget, filters: {}).to_csv)
        end
      end
    end
  end
end
