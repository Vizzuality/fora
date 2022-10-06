FactoryBot.define do
  factory :subgeographic do
    sequence(:geographic) do |n|
      Geographic::TYPES.sample random: Random.new(n)
    end
    parent { nil }
    subgeographic_geometry

    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Address.country
    end

    sequence(:code) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Address.country
    end
  end
end
