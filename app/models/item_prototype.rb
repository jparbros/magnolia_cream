class ItemPrototype < ActiveRecord::Base
  attr_accessible :description, :name, :property_value_ids, :quote, :type, :active
  
  serialize :property_value_ids
  
  def property_values
    property_value_ids.collect do |property_value_id|
      PropertyValue.find(property_value_id)
    end
  end
end
