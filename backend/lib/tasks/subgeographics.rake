namespace :subgeographics do
  desc "Seed db with subgeographics data"
  task import: :environment do
    ######### RUN IMPORTS ##########
    puts "Importing GeoJSON for Countries"
    Importers::Subgeographics::Countries.new(Rails.root.join("db/seeds/files/countries.geojson")).call
    puts "Importing GeoJSON for National"
    Importers::Subgeographics::National.new(Rails.root.join("db/seeds/files/national.geojson")).call
    puts "Importing GeoJSON for Regions"
    Importers::Subgeographics::Regions.new(Rails.root.join("db/seeds/files/regions.geojson")).call
    puts "Importing GeoJSON for States"
    Importers::Subgeographics::States.new(Rails.root.join("db/seeds/files/states.geojson")).call
  end
end
