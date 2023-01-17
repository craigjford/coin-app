class TransactionSerializer < ActiveModel::Serializer

  attributes :id, :user_id, :dealer_id, :num_ounces, :price_per_ounce, :total_cost

  def total_cost 
       self.object.num_ounces.to_i * self.object.price_per_ounce.to_i
  end

  # belongs_to :dealer
end
