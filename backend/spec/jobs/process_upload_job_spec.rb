require "rails_helper"

RSpec.describe ProcessUploadJob do
  describe ".perform_now" do
    let(:process_file_service) { instance_double Uploads::ProcessFile }

    context "when upload is already processed" do
      let(:upload) { create :upload, status: :completed }

      it "does not process file anymore" do
        expect(Uploads::ProcessFile).not_to receive(:new)
        described_class.perform_now upload
      end
    end

    context "when upload is new" do
      let(:upload) { create :upload, status: :new }

      before do
        allow(Uploads::ProcessFile).to receive(:new).and_return process_file_service
        allow(process_file_service).to receive(:call)
      end

      context "when there are not errors" do
        before do
          allow(process_file_service).to receive(:errors).and_return []
          described_class.perform_now upload
        end

        it "changes upload status to completed" do
          expect(upload.reload).to be_completed_status
          expect(upload.error_messages).to be_empty
        end
      end

      context "when there are errors returned by service" do
        let(:errors) { ["THIS IS ERROR"] }

        before do
          allow(process_file_service).to receive(:errors).and_return errors
          described_class.perform_now upload
        end

        it "changes upload status to failed" do
          expect(upload.reload).to be_failed_status
          expect(upload.error_messages).to eq(errors)
        end
      end

      context "when service which process file raises errors" do
        before do
          allow(process_file_service).to receive(:call).and_raise(StandardError)
          described_class.perform_now upload
        end

        it "changes upload status to failed" do
          expect(upload.reload).to be_crashed_status
          expect(upload.error_messages).not_to be_empty
        end
      end
    end
  end
end
