FactoryBot.define do
  factory :funder do
    sequence(:name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.name
    end
    sequence(:description) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    logo { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/files/picture.jpg"), "image/jpeg") }
    sequence(:primary_office_address) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Address.street_address
    end
    sequence(:primary_office_city) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Address.city
    end
    primary_office_state factory: :subgeographic, geographic: :states
    primary_office_country factory: :subgeographic, geographic: :countries
    sequence(:primary_contact_first_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.first_name
    end
    sequence(:primary_contact_last_name) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Name.last_name
    end
    primary_contact_email { Faker::Internet.safe_email(name: "#{primary_contact_first_name} #{primary_contact_last_name}") }
    sequence(:show_primary_email) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Boolean.boolean
    end
    sequence(:primary_contact_phone) do |n|
      Faker::Config.random = Random.new(n)
      Faker::PhoneNumber.cell_phone
    end
    sequence(:primary_contact_location) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Address.full_address
    end
    sequence(:primary_contact_role) do |n|
      Role::TYPES.sample random: Random.new(n)
    end
    sequence(:secondary_email_which_can_be_shared) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Internet.email
    end
    sequence(:website) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Internet.url
    end
    sequence(:date_joined_fora) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Date.between(from: Date.new(ReportYear::TYPES.first.to_i - 2), to: Date.new(ReportYear::TYPES.last.to_i))
    end
    sequence(:funder_type) do |n|
      FunderType::TYPES.sample random: Random.new(n)
    end
    sequence(:funder_type_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:capital_acceptances) do |n|
      CapitalAcceptance::TYPES.sample 2, random: Random.new(n)
    end
    sequence(:capital_acceptances_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:leadership_demographics) do |n|
      Demographic::TYPES.sample 2, random: Random.new(n)
    end
    sequence(:leadership_demographics_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:number_staff_employees) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Number.between from: 1, to: 100
    end
    sequence(:application_status) do |n|
      ApplicationStatus::TYPES.sample random: Random.new(n)
    end
    sequence(:funder_legal_status) do |n|
      FunderLegalStatus::TYPES.sample random: Random.new(n)
    end
    sequence(:funder_legal_status_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:new_to_regenerative_ag) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Boolean.boolean
    end
    sequence(:networks) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.paragraph(sentence_count: 4)
    end
    sequence(:capital_types) do |n|
      CapitalType::TYPES.sample 2, random: Random.new(n)
    end
    sequence(:capital_types_other) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Lorem.sentence
    end
    sequence(:spend_down_strategy) do |n|
      Faker::Config.random = Random.new(n)
      Faker::Boolean.boolean
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
  end
end
