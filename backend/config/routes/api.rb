mount Rswag::Ui::Engine => "/api-docs"
mount Rswag::Api::Engine => "/api-docs"

namespace :api, format: "json" do
  namespace :v1 do
  end
end
