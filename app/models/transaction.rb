class Transaction < ApplicationRecord
  belongs_to :user_id
  belongs_to :dealer_id
end
