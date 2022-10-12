FactoryBot.define do
  factory :project do
    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.name
    end
    sequence(:description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    recipient
  end
end
