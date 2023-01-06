class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :dealer

  # validates :ounces, :price, prescence: true
  # validates :ounces, numericality: { only_integer: true }
  # validates :price, numericality: { only_integer: true }

end
