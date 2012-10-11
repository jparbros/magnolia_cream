class PropertyValue < ActiveRecord::Base
  attr_accessible :active, :display_name, :identifing_name, :property_id
  
  validates :identifing_name,    :presence => true, :length => { :maximum => 250 }
  validates :display_name,       :presence => true, :length => { :maximum => 165 }
  
  belongs_to :property
  
  def self.admin_grid(params = {})

    grid = PropertyValue
    grid = grid.where("active = ?",true)                    unless  params[:show_all].present? &&
                                                              params[:show_all] == 'true'
    grid = grid.where("property_values.display_name LIKE ?", "#{params[:display_name]}%")  if params[:display_name].present?
    grid = grid.where("property_values.identifing_name LIKE ?", "#{params[:identifing_name]}%")  if params[:identifing_name].present?
    grid

  end
  
  def display_active
    active? ? 'True' : 'False'
  end
end
