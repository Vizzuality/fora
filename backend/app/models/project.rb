class Project < ApplicationRecord
  belongs_to :recipient

  validates_uniqueness_of :name, case_sensitive: false, allow_blank: true
end
