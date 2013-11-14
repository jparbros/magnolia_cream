class QuizController < ApplicationController
  
  def index
    @product = Product.active.find "Crema-Magnolia"
    @cart_item = CartItem.new
  end
end
