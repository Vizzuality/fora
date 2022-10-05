FactoryBot.define do
  factory :subgeographic do
    geographic { "countries" }
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
