require "factory_bot_rails"

if Rails.env.development?
  Subgeographic.delete_all
  SubgeographicGeometry.delete_all
  Funder.delete_all

  Rake::Task["subgeographics:import"].invoke

  {countries: (5..10).to_a.sample,
   national: (2..5).to_a.sample,
   regions: (5..10).to_a.sample,
   states: (5..10).to_a.sample}.each do |geographic, samples|
    samples.times do
      subgeographic = Subgeographic.where(geographic: geographic).order("RANDOM()").first
      FactoryBot.create :funder,
        subgeographics: [subgeographic],
        primary_office_state: Subgeographic.where(geographic: :states).order("RANDOM()").first,
        primary_office_country: Subgeographic.where(geographic: :countries).order("RANDOM()").first
    end
  end
end
