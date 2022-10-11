class Recipient < ApplicationRecord
  belongs_to :country, class_name: "Subgeographic"
  belongs_to :state, class_name: "Subgeographic", optional: true

  has_many :projects, dependent: :destroy
  has_many :recipient_subgeographics, dependent: :destroy
  has_many :subgeographics, through: :recipient_subgeographics
  has_many :subgeographic_ancestors, through: :subgeographics, source: :subgeographic_ancestors

  has_one_attached :logo

  validates :leadership_demographics, array_inclusion: {in: Demographic::TYPES, allow_blank: true}
  validates :demographics, array_inclusion: {in: Demographic::TYPES, allow_blank: true}, presence: true
  validates :recipient_legal_status, inclusion: {in: RecipientLegalStatus::TYPES, allow_blank: true}

  validates_uniqueness_of :name, case_sensitive: false, allow_blank: true
  validates :logo, content_type: /\Aimage\/.*\z/
  validates :website, url: true

  validates_presence_of :name
end