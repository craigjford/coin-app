class CreateDealers < ActiveRecord::Migration[6.1]
  def change
    create_table :dealers do |t|
      t.string :name
      t.string :sales_rep
      t.string :address
      t.string :city
      t.string :state
      t.string :phone
      t.string :email
      t.string :url

      t.timestamps
    end
  end
end
