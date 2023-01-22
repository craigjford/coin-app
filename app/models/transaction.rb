class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :dealer

  validates :num_ounces, :price_per_ounce, numericality: { greater_than: 0 }
end
