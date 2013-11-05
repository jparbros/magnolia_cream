class CreateItemPrototyes < ActiveRecord::Migration
  def change
    create_table :item_prototypes do |t|
      t.string :name
      t.text :description
      t.text :quote
      t.text :property_value_ids
      t.string :type

      t.timestamps
    end
  end
end
