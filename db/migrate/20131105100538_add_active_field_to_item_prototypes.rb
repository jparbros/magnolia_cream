class AddActiveFieldToItemPrototypes < ActiveRecord::Migration
  def change
    add_column :item_prototypes, :active, :boolean
  end
end
