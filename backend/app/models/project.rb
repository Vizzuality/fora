class Project < ApplicationRecord
  belongs_to :recipient

  has_many :investments, dependent: :destroy

  validates_uniqueness_of :name, case_sensitive: false, allow_blank: true
end
