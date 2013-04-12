class Customer::RegistrationsController < ApplicationController
  def new
    @registration = true
    @user         = User.new
    @user_session = UserSession.new
    render :template => 'user_sessions/new'
  end

  def create
    @user = User.new(params[:user])
    @user.format_birth_date(params[:user][:birth_date]) if params[:user][:birth_date].present?
    # Saving without session maintenance to skip
    # auto-login which can't happen here because
    # the User has not yet been activated
    if @user.save
      sign_in_and_redirect(@user)
    else
      @registration = true
      @user_session = UserSession.new
      render :template => 'user_sessions/new'
    end
  end
  
  private
  
  def sign_in_and_redirect(user)
    create_session(user)
    redirect_back_or_default root_path
  end
    
  def create_session(user)
    @user_session = UserSession.new(user, true)
    if @user_session.save
      cookies[:hadean_uid] = @user_session.record.access_token
      session[:authenticated_at] = Time.now
      cookies[:insecure] = true
      ## if there is a cart make sure the user_id is correct
      set_user_to_cart_items
    end
  end    
  
  def set_user_to_cart_items
    if session_cart.user_id != @user_session.record.id
      session_cart.update_attributes(:user_id => @user_session.record.id )
    end
    session_cart.cart_items.each do |item|
      item.update_attributes(:user_id => @user_session.record.id ) if item.user_id != @user_session.record.id
    end
  end

end
