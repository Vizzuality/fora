require "rails_helper"

RSpec.describe ProcessUploadJob do
  let(:upload) { create :upload }

  describe ".perform_now" do
    before { described_class.perform_now upload }

    it "changes upload status to completed" do
      expect(upload.reload).to be_completed_status
    end
  end
end
