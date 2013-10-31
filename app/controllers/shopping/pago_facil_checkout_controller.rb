class Shopping::PagoFacilCheckoutController < Shopping::BaseController
  
  def new
    if params[:autorizado] == "1" && params[:autorizacion] != "n/a" && params[:transaccion] != "n/a"
      redirect_to root_url, :notice => "Sorry! Something went wrong with the Paypal purchase. Please try again later." 
    end

    @order = find_or_create_order
    @order.find_total
    
    if @order.total.to_i.to_s == params[:data][:monto]
      @order.create_pago_facil_invoice(params, @order.credited_total)
      @order.remove_user_store_credits
      session_cart.mark_items_purchased(@order)
      Notifier.order_confirmation(@order, invoice).deliver rescue puts( 'do nothing...  dont blow up over an email')
      OrderMailer.order_confirmation(@order).deliver rescue puts( 'do nothing...  dont blow up over an email')
      if current_user && current_user.facebook_authentication
        current_user.facebook_authentication.facebook_client.feed!({message: ENV['FACEBOOK_MESSAGE']}) rescue nil
      end
      redirect_to myaccount_order_path(@order)
    else
    end
  end
end
