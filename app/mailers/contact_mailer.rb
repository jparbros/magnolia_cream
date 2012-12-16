class ContactMailer < ActionMailer::Base
  default from: "info@magnoliacreamparlor.com"
  
  
  def contact_email(params)
    mail(:to => 'info@magnoliacreamparlor.com', :subject => "Email de contacto.", :body => "#{params[:nombre]} #{params[:email]} escribe: #{params[:mensaje]}")
  end
  
end
