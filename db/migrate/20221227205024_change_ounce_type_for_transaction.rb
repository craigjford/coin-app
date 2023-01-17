class ChangeOunceTypeForTransaction < ActiveRecord::Migration[6.1]
    def change
      change_column :transactions, :ounces, :string
    end
end