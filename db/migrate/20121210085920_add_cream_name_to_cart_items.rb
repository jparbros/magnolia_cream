class AddCreamNameToCartItems < ActiveRecord::Migration
  def change
    add_column :cart_items, :cream_name, :string
  end
end
