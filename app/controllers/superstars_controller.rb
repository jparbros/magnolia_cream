class SuperstarsController < ApplicationController
  
  def index
    @superstars = Superstar.availables
    @product = Product.active.find "Crema-Magnolia"
    @cart_item = CartItem.new
  end
end
