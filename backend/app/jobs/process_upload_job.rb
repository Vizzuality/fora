class ProcessUploadJob < ApplicationJob
  def perform(upload)
    upload.processing_status!
    # TODO: prepare all logic responsible for handling upload
    upload.completed_status!
  end
end
