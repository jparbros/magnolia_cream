class AddPropertyValueIdsToOrderItems < ActiveRecord::Migration
  def change
    add_column :order_items, :property_value_ids, :string
  end
end
