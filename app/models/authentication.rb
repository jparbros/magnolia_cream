class Authentication < ActiveRecord::Base

  #
  # Accessors
  #
  attr_accessible :provider, :secret, :token, :uid, :user_id

  #
  # Associations
  #
  belongs_to :user

end
