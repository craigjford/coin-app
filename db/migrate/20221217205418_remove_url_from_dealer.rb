class RemoveUrlFromDealer < ActiveRecord::Migration[6.1]
  def change
    remove_column :dealers, :url
  end
end
