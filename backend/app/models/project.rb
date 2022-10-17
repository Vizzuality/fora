class Project < ApplicationRecord
  include PgSearch::Model

  belongs_to :recipient

  has_many :investments, dependent: :destroy
  has_many :funders, -> { distinct }, through: :investments

  pg_search_scope :search, against: [:name, :description]

  validates_uniqueness_of :name, case_sensitive: false, allow_blank: true

  delegate :website,
    :leadership_demographics,
    :leadership_demographics_other,
    :demographics,
    :demographics_other,
    :recipient_legal_status,
    :recipient_legal_status_other,
    :state,
    :state_id,
    :country,
    :country_id,
    :subgeographics,
    :subgeographic_ids,
    :subgeographic_ancestors,
    :subgeographic_ancestor_ids,
    :logo,
    to: :recipient

  scope :for_subgeographics, ->(abbreviations) { joins(recipient: :subgeographic_ancestors).where(subgeographics: {abbreviation: abbreviations}) }
  scope :for_geographics, ->(geographics) { joins(recipient: :subgeographic_ancestors).where(subgeographics: {geographic: geographics}) }

  def recipient_name
    recipient.name
  end
end
