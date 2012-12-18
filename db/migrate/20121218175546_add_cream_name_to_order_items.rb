class AddCreamNameToOrderItems < ActiveRecord::Migration
  def change
    add_column :order_items, :cream_name, :string
  end
end
