class CreatePropertyValues < ActiveRecord::Migration
  def change
    create_table :property_values do |t|
      t.string :identifing_name
      t.string :display_name
      t.boolean :active, default: true
      t.integer :property_id

      t.timestamps
    end
  end
end
