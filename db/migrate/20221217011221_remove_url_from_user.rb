class RemoveUrlFromUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :url
  end
end
