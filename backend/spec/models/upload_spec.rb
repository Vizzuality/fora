require "rails_helper"

RSpec.describe Upload, type: :model do
  subject { build(:upload) }

  it { is_expected.to be_valid }

  it "should not be valid without created_by" do
    subject.created_by = nil
    expect(subject).to have(1).errors_on(:created_by)
  end

  it "should not be valid when file is not zip" do
    subject.file.attach fixture_file_upload("text_file.txt")
    expect(subject).to have(1).errors_on(:file)
  end
end
