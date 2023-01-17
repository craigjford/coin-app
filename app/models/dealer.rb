class Dealer < ApplicationRecord
    has_many :transactions
    has_many :users, through: :transactions

    validates :name, :sales_rep, :phone, :email, presence: true
    validates :phone, length: { is: 10 }
    validates :phone, numericality: { only_integer: true}
end
