class DealerAllSerializer < ActiveModel::Serializer
  attributes :id, :name, :sales_rep, :address, :city, :state, :phone, :email

end
