class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :city
      t.string :state
      t.string :phone
      t.string :url

      t.timestamps
    end
  end
end
