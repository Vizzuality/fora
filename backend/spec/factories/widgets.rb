FactoryBot.define do
  factory :widget do
    sequence(:report_pages) do |n|
      ReportPage::TYPES.sample 2, random: Random.new(n)
    end
    sequence(:report_year) do |n|
      ReportYear::TYPES.sample random: Random.new(n)
    end
    sequence(:widget_type) do |n|
      WidgetType::TYPES.sample random: Random.new(n)
    end
    sequence(:slug) do |n|
      WidgetSlug::TYPES[n]
    end
    sequence(:position) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Number.between from: 1, to: 100
    end
    sequence(:title) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
  end
end
