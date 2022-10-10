server "52.1.158.47", user: "ubuntu", roles: %w[web app db]
set :branch, "staging"

set :rails_env, :production
set :rack_env, :production
set :stage, :staging
set :appsignal_env, :staging
