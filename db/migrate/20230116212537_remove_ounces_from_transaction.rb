class RemoveOuncesFromTransaction < ActiveRecord::Migration[6.1]
  def change
    remove_column :transactions, :ounces
  end
end
