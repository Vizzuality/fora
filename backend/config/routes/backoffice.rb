devise_for :admins, path: "backoffice"

# admin_root_path is useful for devise
get "/backoffice", to: redirect("backoffice/admins"), as: :admin_root

namespace :backoffice do
  resources :admins
end
