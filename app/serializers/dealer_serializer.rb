class DealerSerializer < ActiveModel::Serializer
  attributes :id, :name, :sales_rep, :address, :city, :state, :phone, :email

  has_many :transactions
end
