class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :dealer

  # validates :num_ounces, :price_per_ounce, :prescence: true
  validates :num_ounces, :price_per_ounce, numericality: { greater_than: 0 }


  # validates :price, :prescence: true, on: :create
  # validates :price, numericality: { only_integer: true }, on: :update

end
