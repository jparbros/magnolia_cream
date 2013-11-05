class PickOfWeeksController < ApplicationController
  
  def index
    @pick_of_weeks = PickOfWeek.availables
    @product = Product.active.find "Crema-Magnolia"
    @cart_item = CartItem.new
  end
end
