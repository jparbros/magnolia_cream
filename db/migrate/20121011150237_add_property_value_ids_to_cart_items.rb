class AddPropertyValueIdsToCartItems < ActiveRecord::Migration
  def change
    add_column :cart_items, :property_value_ids, :text
  end
end
