namespace :widgets do
  desc "Generate Widgets"
  task generate: :environment do
    ReportYear::TYPES.each do |year|
      puts "Generating Widgets for #{year}"
      Widget.upsert_all [
        {report_pages: ["general_report"], report_year: year, widget_type: "total", slug: "summary", position: 1, title: "Summary"},
        {report_pages: ["general_report"], report_year: year, widget_type: "table", slug: "funded_areas", position: 2, title: "Amount funded towards area of focus (USD)"},
        {report_pages: ["general_report"], report_year: year, widget_type: "table", slug: "funded_subgeographics", position: 3, title: "Amount funded towards geographic focus (USD)"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "funded_demographics", position: 4, title: "Amount funded towards each demographic focus (USD)"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "funded_funder_types", position: 5, title: "Amount funded by each funder organization type (USD)"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "funded_capital_types", position: 6, title: "Amount directed towards each capital type (USD)"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "funded_funder_legal_statuses", position: 7, title: "Amount funded towards each grantee legal status (USD)"},
        {report_pages: ["general_report"], report_year: year, widget_type: "table", slug: "total_projects_funders_areas", position: 8, title: "Total number of projects and funders per area of focus"},
        {report_pages: ["general_report"], report_year: year, widget_type: "table", slug: "total_projects_funders_subgeographics", position: 9, title: "Total number of projects and funders per geographic focus"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "total_projects_capital_types", position: 10, title: "Total number of projects per capital type"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "total_projects_demographics", position: 11, title: "Total number of projects per demographic focus"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "total_funders_capital_types", position: 12, title: "Total number of funders per capital type"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "total_funders_demographics", position: 13, title: "Total number of funders per demographic focus"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "total_funders_funder_types", position: 14, title: "Total number of funders per organization type"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "total_funders_capital_acceptances", position: 15, title: "Total number of funders per capital acceptance"},
        {report_pages: ["general_report"], report_year: year, widget_type: "diagram", slug: "total_projects_recipient_legal_statuses", position: 16, title: "Total number of projects per legal status"}
      ], unique_by: [:slug, :report_year]
    end
  end
end
