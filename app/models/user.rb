class User < ApplicationRecord
    has_secure_password
    has_many :transactions
    has_many :dealers, through: :transactions

    validates :username, :password, :phone, :email, presence: true
    validates :username, uniqueness: true
    validates :phone, length: { is: 10 }

end

