class OrderMailer < ActionMailer::Base
  default from: "info@magnoliacreamparlor.com"
  
  def order_confirmation(order)
    @order = order
    mail(:bbc => 'jorge.sotomoreno@gmail.com', :to => [order.email], :subject => "Magnolia Cream Parlos - Confirmacion de orden")
  end
end
