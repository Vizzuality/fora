class SubgeographicGeometry < ApplicationRecord
  validates_presence_of :geometry

  has_many :subgeographics, dependent: :destroy
end
