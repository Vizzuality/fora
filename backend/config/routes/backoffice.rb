devise_for :admins, path: "backoffice"

# admin_root_path is useful for devise
get "/backoffice", to: redirect("backoffice/uploads"), as: :admin_root

namespace :backoffice do
  resources :admins
  resources :uploads, only: %i[new create index show destroy]
end
