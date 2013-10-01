module Shopping::PaypalCheckoutHelper
  def get_setup_purchase_params(request)
    order_subtotal = @order.coupon.present? ? @order.sub_total - @order.coupon_amount : @order.sub_total
    return {
        :ip => request.remote_ip,
        :return_url => review_shopping_paypal_checkout_url,
        :cancel_return_url => root_url,
        :subtotal => to_cents(order_subtotal),
        :shipping => to_cents(@order.shipping_charges),
        :handling => 0,
        :tax =>      0,
        :allow_note =>  true,
        :items => get_items,
        :solution_type => 'sole',
        :landing_page => 'billing',
        :currency => 'MXN'
      }
  end

  def get_items
    @order.order_items.group_by(&:variant_id).collect do |variant_id, items|
      product = items.first.variant.product
      item_price = @order.coupon.present? ? (items.first.price * (100.0 - @order.coupon.percent.to_f)/100.0).to_f, @order) : items.first.price
      {:name => product.name, 
       :quantity => items.size, 
       :amount => to_cents(item_price), 
      }
    end
  end

  def to_cents(money)
    (money*100).round
  end
  
  def get_purchase_params(request, params)
    order_subtotal = @order.coupon.present? ? @order.sub_total - @order.coupon_amount : @order.sub_total
    return {
      :ip => request.remote_ip,
      :token => params[:token],
      :payer_id => params[:PayerID],
      :subtotal => to_cents(order_subtotal),
      :shipping => to_cents(@order.shipping_charges),
      :handling => 0,
      :tax =>      0,
      :items =>    get_items,
      :solution_type => 'sole',
      :currency => 'MXN'
    }
  end
end
