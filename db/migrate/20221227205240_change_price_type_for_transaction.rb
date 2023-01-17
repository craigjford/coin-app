class ChangePriceTypeForTransaction < ActiveRecord::Migration[6.1]
    def change
      change_column :transactions, :price, :string
    end
end
