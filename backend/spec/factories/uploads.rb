FactoryBot.define do
  factory :upload do
    created_by factory: :admin
    status { :new }
    error_messages { [] }
    file { Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/files/upload.zip"), "application/zip") }
  end
end
