require "rails_helper"

RSpec.describe JWTAuth do
  let(:member) { create(:member) }

  describe ".encode" do
    it "returns encoded token" do
      token = described_class.encode member
      expect(token).to be_present
    end
  end

  describe ".decode" do
    it "returns decoded member" do
      token = described_class.encode member
      member_from_token = described_class.decode(token)
      expect(member_from_token).to eq(member)
    end

    it "returns nil if token is invalid" do
      member_from_token = described_class.decode("WRONG_TOKEN")
      expect(member_from_token).to be_nil
    end

    it "returns nil if token is expired" do
      token = described_class.encode member
      travel 2.weeks do
        member_from_token = described_class.decode(token)
        expect(member_from_token).to be_nil
      end
    end
  end
end
