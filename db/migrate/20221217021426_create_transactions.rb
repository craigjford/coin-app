class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.belongs_to :user_id, null: false, foreign_key: true
      t.belongs_to :dealer_id, null: false, foreign_key: true
      t.integer :ounces
      t.float :price

      t.timestamps
    end
  end
end
