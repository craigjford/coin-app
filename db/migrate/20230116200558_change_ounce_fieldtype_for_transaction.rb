class ChangeOunceFieldtypeForTransaction < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :num_ounces, :integer
  end
end
