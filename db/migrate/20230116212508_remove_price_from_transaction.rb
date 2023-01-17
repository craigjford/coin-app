class RemovePriceFromTransaction < ActiveRecord::Migration[6.1]
  def change
    remove_column :transactions, :price
  end
end
