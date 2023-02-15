require "factory_bot_rails"

if Rails.env.development?
  Investment.destroy_all
  Funder.destroy_all
  Project.destroy_all
  Recipient.destroy_all
  Widget.destroy_all
  Upload.destroy_all
  Admin.destroy_all
  Subgeographic.destroy_all
  SubgeographicGeometry.destroy_all

  Admin.create! first_name: "Admin", last_name: "Example", password: "SuperSecret1234", email: "admin@example.com"

  Rake::Task["subgeographics:import"].invoke
  Rake::Task["widgets:generate"].invoke

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
