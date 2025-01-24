class FunderSubgeographic < ApplicationRecord
  belongs_to :funder, touch: true
  belongs_to :subgeographic
end
