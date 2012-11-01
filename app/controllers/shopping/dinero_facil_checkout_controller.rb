class Shopping::DineroFacilCheckoutController < Shopping::BaseController
  
  def review
    
  end
  
  def pending
    @order = find_or_create_order
    @order.find_total
    @order.create_DF_pending_invoice(@order.credited_total)
    @order.remove_user_store_credits
    session_cart.mark_items_purchased(@order)
    Notifier.order_confirmation(@order, invoice).deliver rescue puts( 'do nothing...  dont blow up over an email')
    redirect_to myaccount_order_path(@order)
  end
end
