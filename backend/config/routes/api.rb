mount Rswag::Ui::Engine => "/api-docs"
mount Rswag::Api::Engine => "/api-docs"

namespace :api, format: "json" do
  namespace :v1 do
    # enums
    resources :funding_types, only: %i[index]
    resources :grant_durations, only: %i[index]
    resources :application_statuses, only: %i[index]
    resources :roles, only: %i[index]
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
  end
end
