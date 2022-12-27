class Dealer < ApplicationRecord
    has_many :transactions
    has_many :users, through: :transactions

    validates :name, :sales_rep, :phone, :email, presence: true
end
