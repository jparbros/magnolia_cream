class OrderMailer < ActionMailer::Base
  default from: "info@magnoliacreamparlor.com"
  default bcc: ['jorge.sotomoreno@gmail.com','jparbros@gmail.com', 'info@magnoliacreamparlor.com', 'sergiogutierrez@magnoliacreamparlor.com', 'diegomorones@magnoliacreamparlor.com']
  
  def order_confirmation(order)
    @order = order
    mail(:to => [order.email], :subject => "Magnolia Cream Parlos - Confirmacion de orden")
  end
end
