class Shopping::ShippingMethodsController < Shopping::BaseController
  # GET /shopping/shipping_methods
  # GET /shopping/shipping_methods.xml
  def index
    unless find_or_create_order.ship_address_id
      flash[:notice] = I18n.t('select_address_before_shipping_method')
      redirect_to shopping_addresses_url
    else
      session_order.find_sub_total

      @order_items = session_order.order_items.includes({:variant => {:product => :shipping_category}})
      
      OrderItem.update_all("shipping_rate_id = #{ShippingRate.first.id}","id IN (#{@order_items.map{|i| i.id}.join(',')})")

      respond_to do |format|
        format.html { redirect_to(shopping_orders_url) }
      end
    end
  end

  # PUT /shopping/shipping_methods/1
  # PUT /shopping/shipping_methods/1.xml
  def update
    all_selected = true
    params[:shipping_category].each_pair do |category_id, rate_id|
      if rate_id
        items = OrderItem.includes([{:variant => :product}]).
                          where(['order_items.order_id = ? AND
                                  products.shipping_category_id = ?', session_order_id, category_id])

        OrderItem.update_all("shipping_rate_id = #{rate_id}","id IN (#{items.map{|i| i.id}.join(',')})")
      else
        all_selected = false
      end
    end
    respond_to do |format|
      if all_selected
        format.html { redirect_to(shopping_orders_url, :notice => I18n.t('shipping_method_updated')) }
        format.xml  { head :ok }
      else
        format.html { redirect_to( shopping_shipping_methods_url, :notice => I18n.t('all_shipping_methods_must_be_selected')) }
      end
    end
  end

end
