class ContactController < ApplicationController
  
  def new
    
  end
  
  def create
    ContactMailer.contact_email(params).deliver
    redirect_to root_url, notice: 'Mensaje enviado'
  end
end
