class Admin::Generic::CouponsController < Admin::Generic::BaseController
  def index
    @coupons = Coupon.all
  end

  def show
    @coupon = Coupon.find(params[:id])
  end

  def new
    form_info
    @coupon = Coupon.new
  end

  def create
      coupon_attributtes = params[:coupon] || params[:coupon_value] || params[:coupon_percent]
      if coupon_attributtes[:c_type] == 'coupon_value'
        @coupon = CouponValue.new(coupon_attributtes)
      elsif coupon_attributtes[:c_type] == 'coupon_percent'
        @coupon = CouponPercent.new(coupon_attributtes)
      else
        @coupon = Coupon.new(coupon_attributtes)
        @coupon.errors.add(:base, 'please select coupon type')
      end
    if @coupon.errors.size == 0 && @coupon.save
      flash[:notice] = "Successfully created coupon."
      redirect_to admin_generic_coupon_url(@coupon)
    else
      form_info
      render :action => 'new'
    end
  end

  def edit
    form_info
    @coupon = Coupon.find(params[:id])
  end

  def update
    coupon_attributtes = params[:coupon] || params[:coupon_value] || params[:coupon_percent]
    @coupon = Coupon.find(params[:id])
    if @coupon.update_attributes(coupon_attributtes)
      flash[:notice] = "Successfully updated coupon."
      redirect_to admin_generic_coupon_url(@coupon)
    else
      form_info
      render :action => 'edit'
    end
  end

  def destroy
    @coupon = Coupon.find(params[:id])
    @coupon.destroy
    flash[:notice] = "Successfully destroyed coupon."
    redirect_to admin_generic_coupons_url
  end

  private

  def form_info
    @coupon_types = Coupon::COUPON_TYPES
  end
end
