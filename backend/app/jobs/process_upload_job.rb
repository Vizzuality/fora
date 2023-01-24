class ProcessUploadJob < ApplicationJob
  def perform(upload)
    upload.with_lock do
      return unless upload.new_status?

      upload.processing_status!
      process_file_of upload
    rescue => e
      upload.update! status: :crashed, error_messages: e.backtrace
    end
  end

  private

  def process_file_of(upload)
    process_file_service = Uploads::ProcessFile.new upload
    process_file_service.call
    return upload.update! status: :failed, error_messages: process_file_service.errors if process_file_service.errors.present?

    upload.completed_status!
    Frontend::RevalidateStaticPagesJob.perform_later paths: :all
  end
end
