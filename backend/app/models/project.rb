class Project < ApplicationRecord
  include PgSearch::Model

  belongs_to :recipient

  has_many :investments, dependent: :destroy
  has_many :funders, -> { distinct }, through: :investments
  has_many :investment_subgeographics, through: :investments
  has_many :subgeographics, -> { distinct }, through: :investment_subgeographics
  has_many :subgeographic_ancestors, through: :subgeographics, source: :subgeographic_ancestors

  pg_search_scope :search, associated_against: {recipient: [:name, :description]}

  delegate :name,
    :description,
    :website,
    :leadership_demographics,
    :leadership_demographics_other,
    :recipient_legal_status,
    :recipient_legal_status_other,
    :state,
    :state_id,
    :country,
    :country_id,
    :logo,
    to: :recipient

  scope :for_subgeographics, ->(abbreviations) { joins(:subgeographic_ancestors).where(subgeographics: {abbreviation: abbreviations}) }
  scope :for_geographics, ->(geographics) { joins(:subgeographic_ancestors).where(subgeographics: {geographic: geographics}) }
  scope :with_funders_count, -> {
    funders_count = Investment.where("investments.project_id = projects.id").select("COUNT(DISTINCT investments.funder_id)").to_sql
    select "projects.*, (#{funders_count}) AS funders_count"
  }

  def areas
    investments_data_for :areas
  end

  def demographics
    investments_data_for :demographics
  end

  def demographics_other
    investments_data_for(:demographics_other).compact.join("\n")
  end

  private

  def investments_data_for(attr)
    investments.map { |investment| investment.public_send attr }.flatten.uniq
  end
end
