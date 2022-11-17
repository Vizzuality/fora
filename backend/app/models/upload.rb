class Upload < ApplicationRecord
  belongs_to :created_by, class_name: "Admin"

  enum :status, {new: 0, processing: 1, completed: 2, failed: 3, crashed: 4}, suffix: true, default: :new

  has_one_attached :file

  validates :file, attached: true, content_type: "application/zip"

  alias_method :to_s, :id
end
