class ChangePriceFieldtypeForTransaction < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :price_per_ounce, :integer
  end
end
