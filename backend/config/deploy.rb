# config valid for current version and patch releases of Capistrano
lock "~> 3.17.0"

set :application, "fora-backend"
set :repo_url, "https://github.com/Vizzuality/fora.git"
set :repo_tree, "backend"
set :deploy_to, "/var/www/fora-backend"

set :rvm_custom_path, "/usr/share/rvm"

set :linked_files, %w[config/master.key .env]
set :linked_dirs, %w[log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system]

set :keep_releases, 3
set :keep_assets, 3

set :db_local_clean, true
set :db_remote_clean, true

set :init_system, :systemd
set :sidekiq_service_unit_user, :system
set :systemctl_user, :system

set :passenger_restart_with_sudo, true
set :passenger_roles, :web

set :rbenv_map_bins, %w[rake gem bundle ruby rails]
set :rbenv_type, :user
set :rbenv_ruby, "3.1.2"

set :default_env, {
  PATH: "$HOME/.nvm/versions/node/v16.14.2/bin/:$PATH",
  NODE_ENVIRONMENT: "production"
}
