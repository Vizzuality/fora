module Backoffice
  class UploadsController < BaseController
    include AsResource

    self.includes = :created_by

    def create
      super do |resource|
        ProcessUploadJob.perform_later resource
      end
    end

    private

    def create_params
      params.require(:upload).permit(:file).merge created_by: current_admin
    end
  end
end
