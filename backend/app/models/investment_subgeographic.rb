class InvestmentSubgeographic < ApplicationRecord
  belongs_to :investment, touch: true
  belongs_to :subgeographic
end
