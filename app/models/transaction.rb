class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :dealer
end
