class Project < ApplicationRecord
  belongs_to :recipient

  has_many :investments, dependent: :destroy
  has_many :funders, -> { distinct }, through: :investments

  validates_uniqueness_of :name, case_sensitive: false, allow_blank: true
end
