class Investment < ApplicationRecord
  belongs_to :funder
  belongs_to :project

  has_many :investment_subgeographics, dependent: :destroy
  has_many :subgeographics, through: :investment_subgeographics
  has_many :subgeographic_ancestors, through: :subgeographics, source: :subgeographic_ancestors

  validates :demographics, array_inclusion: {in: Demographic::TYPES, allow_blank: true}, presence: true
  validates :funding_type, inclusion: {in: FundingType::TYPES, allow_blank: true}, presence: true
  validates :capital_types, array_inclusion: {in: CapitalType::TYPES, allow_blank: true}, presence: true
  validates :areas, array_inclusion: {in: Area::TYPES, allow_blank: true}, presence: true
  validates :grant_duration, inclusion: {in: GrantDuration::TYPES, allow_blank: true}, presence: true

  validates :number_of_grant_years, presence: true, if: -> { grant_duration == "multi_year" }
  validates :visible, inclusion: {in: [true, false]}
  validates :year_invested, :initial_funded_year, numericality: {only_integer: true, greater_than: 1980, less_than: 2100}
  validates :amount, numericality: {greater_than: 0}
end
