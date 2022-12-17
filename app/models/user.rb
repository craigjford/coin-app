class User < ApplicationRecord
    has_secure_password

    validates :username, :password, :phone, :email, presence: true
    validates :username, uniqueness: true
    validates :phone, length: { is: 10 }

end

