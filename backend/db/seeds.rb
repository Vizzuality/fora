require "factory_bot_rails"

if Rails.env.development?
  Subgeographic.delete_all
  SubgeographicGeometry.delete_all
  Investment.delete_all
  Funder.delete_all
  Project.delete_all
  Recipient.delete_all
  Admin.delete_all

  Admin.create! first_name: "Admin", last_name: "Example", password: "SuperSecret1234", email: "admin@example.com"

  Rake::Task["subgeographics:import"].invoke

  puts "Generating Funders"
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

  puts "Generating Recipients with Project"
  {countries: (5..10).to_a.sample,
   national: (2..5).to_a.sample,
   regions: (5..10).to_a.sample,
   states: (5..10).to_a.sample}.each do |geographic, samples|
    samples.times do
      subgeographic = Subgeographic.where(geographic: geographic).order("RANDOM()").first
      recipient = FactoryBot.create :recipient,
        subgeographics: [subgeographic],
        state: Subgeographic.where(geographic: :states).order("RANDOM()").first,
        country: Subgeographic.where(geographic: :countries).order("RANDOM()").first
      FactoryBot.create :project, recipient: recipient
    end
  end

  puts "Generating Investments"
  (20..100).to_a.sample.times do
    FactoryBot.create :investment,
      funder: Funder.order("RANDOM()").first,
      project: Project.order("RANDOM()").first
  end
end
