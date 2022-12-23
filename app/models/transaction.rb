class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :dealer

  validates :ounces, numericality: { greater_than: 0 }
  validates :price, numericality: { greater_than: 200 }

end
