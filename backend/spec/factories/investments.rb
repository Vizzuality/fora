FactoryBot.define do
  factory :investment do
    funder
    project
    sequence(:amount) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Number.decimal l_digits: 2
    end
    sequence(:year_invested) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Date.between(from: Date.new(ReportYear::TYPES.first.to_i), to: Date.new(ReportYear::TYPES.last.to_i)).year
    end
    sequence(:initial_funded_year) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Date.between(from: 5.years.ago, to: Date.today).year
    end
    sequence(:submitting_organization_contact_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.name
    end
    sequence(:funding_type) do |n|
      FundingType::TYPES.sample random: Random.new(n)
    end
    sequence(:funding_type_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:capital_type) do |n|
      CapitalType::TYPES.sample random: Random.new(n)
    end
    sequence(:capital_type_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:areas) do |n|
      Area::TYPES.sample 2, random: Random.new(n)
    end
    sequence(:areas_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:demographics) do |n|
      Demographic::TYPES.sample 2, random: Random.new(n)
    end
    sequence(:demographics_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:grant_duration) do |n|
      GrantDuration::TYPES.sample random: Random.new(n)
    end
    sequence(:number_of_grant_years) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Number.between from: 1, to: 5
    end
    sequence(:privacy) do |n|
      InvestmentPrivacy::TYPES.sample random: Random.new(n)
    end
  end
end
