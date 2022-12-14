class Investment < ApplicationRecord
  belongs_to :funder
  belongs_to :project

  has_many :investment_subgeographics, dependent: :destroy
  has_many :subgeographics, through: :investment_subgeographics
  has_many :subgeographic_ancestors, through: :subgeographics, source: :subgeographic_ancestors

  validates :demographics, array_inclusion: {in: Demographic::TYPES, allow_blank: true}
  validates :funding_type, inclusion: {in: FundingType::TYPES, allow_blank: true}
  validates :capital_type, inclusion: {in: CapitalType::TYPES, allow_blank: true}, presence: true
  validates :areas, array_inclusion: {in: Area::TYPES, allow_blank: true}, presence: true
  validates :grant_duration, inclusion: {in: GrantDuration::TYPES, allow_blank: true}, presence: true
  validates :privacy, inclusion: {in: InvestmentPrivacy::TYPES, allow_blank: true}, presence: true

  validates :number_of_grant_years, presence: true, if: -> { grant_duration == "multi_year" }
  validates :funding_type, presence: true, if: -> { capital_type == "grants" }
  validates :year_invested, :initial_funded_year, numericality: {only_integer: true, greater_than: 1980, less_than: 2100}
  validates :amount, numericality: {greater_than: 0}

  scope :can_show_aggregated_amount, -> { where privacy: %w[all aggregate_amount_funded] }
  scope :can_be_shown_without_amount, -> { where privacy: %w[all aggregate_amount_funded amount_funded_visible_only_to_members amount_funded_visible_only_to_staff] }
end
