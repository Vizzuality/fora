class Subgeographic < ApplicationRecord
  has_closure_tree

  belongs_to :parent, class_name: "Subgeographic", optional: true
  belongs_to :subgeographic_geometry, optional: true

  has_many :subgeographics, foreign_key: "parent_id", dependent: :destroy
  has_many :hierarchy_ancestors, class_name: "SubgeographicHierarchy", foreign_key: "descendant_id", dependent: :destroy
  has_many :subgeographic_ancestors, class_name: "Subgeographic", through: :hierarchy_ancestors, source: :ancestor
  has_many :hierarchy_descendants, class_name: "SubgeographicHierarchy", foreign_key: "ancestor_id", dependent: :destroy
  has_many :subgeographic_descendants, class_name: "Subgeographic", through: :hierarchy_descendants, source: :descendant

  has_many :funder_primary_office_states, class_name: "Funder", foreign_key: "primary_office_state_id", dependent: :destroy
  has_many :funder_primary_office_countries, class_name: "Funder", foreign_key: "primary_office_country_id", dependent: :destroy
  has_many :funder_subgeographics, dependent: :destroy
  has_many :funders, through: :funder_subgeographics

  validates :geographic, inclusion: {in: Geographic::TYPES, allow_blank: true}, presence: true
  validates_uniqueness_of :name, scope: %i[geographic parent_id], case_sensitive: false, allow_blank: true
  validates_uniqueness_of :code, scope: :geographic
  validates_presence_of :name, :code

  Geographic::TYPES.each do |geographic|
    scope geographic, -> { where(geographic: geographic) }
  end
  scope :only_active, -> {
    recipients = InvestmentSubgeographic.select("subgeographic_id").to_sql
    funders = FunderSubgeographic.select("subgeographic_id").to_sql
    where(id: SubgeographicHierarchy.where("descendant_id IN (#{recipients} UNION #{funders})").select(:ancestor_id))
  }

  after_commit :invalidate_cache

  accepts_nested_attributes_for :subgeographic_geometry, reject_if: :all_blank, allow_destroy: true

  delegate :geometry, to: :subgeographic_geometry

  def self.as_geojson(geographic)
    Rails.cache.fetch "geojson-#{geographic}", expires_in: 1.day do
      features = select("subgeographics.id, name, code, abbreviation, parent_id, ST_AsGeoJSON(geometry)::json as geom")
        .joins(:subgeographic_geometry).where(geographic: geographic).map do |s|
        {type: "Feature", geometry: s.geom, properties: {id: s.id, code: s.code, name: s.name, abbreviation: s.abbreviation, parent_id: s.parent_id}}
      end
      {type: "FeatureCollection", features: features}
    end
  end

  private

  def invalidate_cache
    Rails.cache.delete "geojson-#{geographic}"
  end
end
