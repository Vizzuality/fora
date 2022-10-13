class Funder < ApplicationRecord
  include PgSearch::Model

  belongs_to :primary_office_state, class_name: "Subgeographic", optional: true
  belongs_to :primary_office_country, class_name: "Subgeographic"

  has_many :investments, dependent: :destroy
  has_many :projects, -> { distinct }, through: :investments
  has_many :funder_subgeographics, dependent: :destroy
  has_many :subgeographics, through: :funder_subgeographics
  has_many :subgeographic_ancestors, through: :subgeographics, source: :subgeographic_ancestors

  has_one_attached :logo

  pg_search_scope :search, against: [:name, :description]

  validates :primary_contact_role, inclusion: {in: Role::TYPES, allow_blank: true}, presence: true
  validates :funder_type, inclusion: {in: FunderType::TYPES, allow_blank: true}, presence: true
  validates :capital_acceptances, array_inclusion: {in: CapitalAcceptance::TYPES, allow_blank: true}, presence: true
  validates :leadership_demographics, array_inclusion: {in: Demographic::TYPES, allow_blank: true}, presence: true
  validates :application_status, inclusion: {in: ApplicationStatus::TYPES, allow_blank: true}, presence: true
  validates :funder_legal_status, inclusion: {in: FunderLegalStatus::TYPES, allow_blank: true}, presence: true
  validates :capital_types, array_inclusion: {in: CapitalType::TYPES, allow_blank: true}, presence: true
  validates :areas, array_inclusion: {in: Area::TYPES, allow_blank: true}, presence: true
  validates :demographics, array_inclusion: {in: Demographic::TYPES, allow_blank: true}, presence: true

  validates_uniqueness_of :name, case_sensitive: false, allow_blank: true
  validates :logo, content_type: /\Aimage\/.*\z/
  validates :website, url: true

  validates_presence_of :name,
    :description,
    :primary_office_address,
    :primary_office_city,
    :primary_contact_first_name,
    :primary_contact_last_name,
    :primary_contact_email,
    :primary_contact_phone,
    :primary_contact_location,
    :date_joined_fora,
    :number_staff_employees

  scope :for_subgeographics, ->(abbreviations) { joins(:subgeographic_ancestors).where(subgeographics: {abbreviation: abbreviations}) }
  scope :for_geographics, ->(geographics) { joins(:subgeographic_ancestors).where(subgeographics: {geographic: geographics}) }
  scope :with_projects_count, -> {
    projects_count = Project.joins(:investments).where("investments.funder_id = funders.id").select("COUNT(DISTINCT investments.project_id)").to_sql
    select "funders.*, (#{projects_count}) AS projects_count"
  }
end
