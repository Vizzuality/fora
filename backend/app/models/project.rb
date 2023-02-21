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

  %i[areas capital_type demographics].each do |attr|
    define_method attr.to_s.pluralize do
      investments_data_for attr
    end
  end

  %i[demographics_other capital_type_other].each do |attr|
    define_method attr do
      investments_data_for(attr).compact.join("\n")
    end
  end

  private

  def investments_data_for(attr)
    investments.map { |investment| investment.public_send attr }.flatten.uniq
  end
end
