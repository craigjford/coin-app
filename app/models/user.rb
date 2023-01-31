class User < ApplicationRecord
    has_secure_password
    has_many :transactions
    has_many :dealers, through: :transactions

    validates :username, :password, :phone, :email, presence: true
    validates :username, uniqueness: true
    validates :phone, length: { is: 10 }
    validates :phone, numericality: { only_integer: true}

    def user_by_phone_number
        byebug
        input
        phone = params[:phone]
        if !phone.integer?
           valid_number = false
        end
        valid_number
    end

end

