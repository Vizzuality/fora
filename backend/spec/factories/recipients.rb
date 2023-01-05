FactoryBot.define do
  factory :recipient do
    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.name
    end
    sequence(:description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    logo { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/files/picture.jpg"), "image/jpeg") }
    sequence(:contact_first_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.first_name
    end
    sequence(:contact_last_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.first_name
    end
    sequence(:website) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Internet.url
    end
    state factory: :subgeographic, geographic: :states
    country factory: :subgeographic, geographic: :countries
    sequence(:city) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Address.city
    end
    sequence(:leadership_demographics) do |n|
      Demographic::TYPES.sample 2, random: Random.new(n)
    end
    sequence(:leadership_demographics_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:recipient_legal_status) do |n|
      RecipientLegalStatus::TYPES.sample random: Random.new(n)
    end
  end
end
