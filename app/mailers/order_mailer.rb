class OrderMailer < ActionMailer::Base
  default from: "info@magnoliacreamparlor.com"
  
  def order_confirmation(order)
    @order = order
    mail(:bcc => ['jorge.sotomoreno@gmail.com','jparbros@gmail.com'], :to => [order.email], :subject => "Magnolia Cream Parlos - Confirmacion de orden")
  end
end
