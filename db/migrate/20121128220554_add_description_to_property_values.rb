class AddDescriptionToPropertyValues < ActiveRecord::Migration
  def change
    add_column :property_values, :description, :text
  end
end
