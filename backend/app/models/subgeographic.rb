class Subgeographic < ApplicationRecord
  belongs_to :parent, class_name: "Subgeographic", optional: true
  belongs_to :subgeographic_geometry, optional: true

  has_many :subgeographics, foreign_key: "parent_id", dependent: :destroy

  validates :geographic, inclusion: {in: Geographic::TYPES, allow_blank: true}, presence: true
  validates_uniqueness_of :name, scope: %i[geographic parent_id], case_sensitive: false, allow_blank: true
  validates_presence_of :name, :code

  Geographic::TYPES.each do |geographic|
    scope geographic, -> { where(geographic: geographic) }
  end

  accepts_nested_attributes_for :subgeographic_geometry, reject_if: :all_blank, allow_destroy: true

  delegate :geometry, to: :subgeographic_geometry
end
