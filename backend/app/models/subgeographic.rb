class Subgeographic < ApplicationRecord
  belongs_to :parent, class_name: "Subgeographic", optional: true
  belongs_to :subgeographic_geometry, optional: true

  has_many :subgeographics, foreign_key: "parent_id", dependent: :destroy
  has_many :funder_primary_office_states, class_name: "Funder", foreign_key: "primary_office_state_id", dependent: :destroy
  has_many :funder_primary_office_countries, class_name: "Funder", foreign_key: "primary_office_country_id", dependent: :destroy
  has_many :funder_subgeographics, dependent: :destroy
  has_many :funders, through: :funder_subgeographics

  validates :geographic, inclusion: {in: Geographic::TYPES, allow_blank: true}, presence: true
  validates_uniqueness_of :name, scope: %i[geographic parent_id], case_sensitive: false, allow_blank: true
  validates_presence_of :name, :code

  Geographic::TYPES.each do |geographic|
    scope geographic, -> { where(geographic: geographic) }
  end

  after_commit :invalidate_cache

  accepts_nested_attributes_for :subgeographic_geometry, reject_if: :all_blank, allow_destroy: true

  delegate :geometry, to: :subgeographic_geometry

  def self.as_geojson(geographic)
    Rails.cache.fetch "geojson-#{geographic}", expires_in: 1.day do
      features = select("subgeographics.id, name, code, parent_id, ST_AsGeoJSON(geometry)::json as geom")
        .joins(:subgeographic_geometry).where(geographic: geographic).map do |s|
        {type: "Feature", geometry: s.geom, properties: {id: s.id, code: s.code, name: s.name, parent_id: s.parent_id}}
      end
      {type: "FeatureCollection", features: features}
    end
  end

  private

  def invalidate_cache
    Rails.cache.delete "geojson-#{geographic}"
  end
end
