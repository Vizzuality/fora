class Funder < ApplicationRecord
  belongs_to :primary_office_state, class_name: "Subgeographic", optional: true
  belongs_to :primary_office_country, class_name: "Subgeographic"

  has_many :funder_subgeographics, dependent: :destroy
  has_many :subgeographics, through: :funder_subgeographics

  has_one_attached :logo

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
end
