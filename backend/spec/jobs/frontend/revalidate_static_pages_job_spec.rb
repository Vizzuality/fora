require "rails_helper"

RSpec.describe Frontend::RevalidateStaticPagesJob, type: :job do
  describe ".perform_now" do
    let(:revalidation_service) { instance_double Frontend::RevalidateStaticPages }

    before do
      allow(Frontend::RevalidateStaticPages).to receive(:new).with(paths: :all).and_return revalidation_service
    end

    it "calls revalidate static pages service" do
      expect(revalidation_service).to receive(:call)
      described_class.perform_now paths: :all
    end
  end
end
