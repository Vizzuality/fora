require "factory_bot_rails"

if Rails.env.development?
  Subgeographic.delete_all
  SubgeographicGeometry.delete_all

  Rake::Task["subgeographics:import"].invoke
end
