mount Rswag::Ui::Engine => "/api-docs"
mount Rswag::Api::Engine => "/api-docs"

namespace :api, format: "json" do
  namespace :v1 do
    # enums
    resources :widget_slugs, only: %i[index]
    resources :widget_types, only: %i[index]
    resources :report_years, only: %i[index]
    resources :report_pages, only: %i[index]
    resources :funding_types, only: %i[index]
    resources :grant_durations, only: %i[index]
    resources :application_statuses, only: %i[index]
    resources :capital_acceptances, only: %i[index]
    resources :demographics, only: %i[index]
    resources :capital_types, only: %i[index]
    resources :recipient_legal_statuses, only: %i[index]
    resources :funder_legal_statuses, only: %i[index]
    resources :funder_types, only: %i[index]
    resources :geographics, only: %i[index]
    resources :areas, only: %i[index]

    resources :subgeographics, only: %i[index] do
      collection do
        get :geojson
      end
    end
    resources :funders, only: %i[index show]
    resources :projects, only: %i[index show]
    resources :widgets, only: %i[index show] do
      member do
        get :download
      end
    end
  end
end
