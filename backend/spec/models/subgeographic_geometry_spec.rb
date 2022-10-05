require "rails_helper"

RSpec.describe SubgeographicGeometry, type: :model do
  subject { build(:subgeographic_geometry) }

  it { is_expected.to be_valid }

  it "should not be valid without geometry" do
    subject.geometry = nil
    expect(subject).to have(1).errors_on(:geometry)
  end
end
