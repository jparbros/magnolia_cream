class Admin::Merchandise::PickOfWeeksController < Admin::BaseController
  
  helper_method :sort_column, :sort_direction

  def index
    params[:page] ||= 1
    @pick_of_weeks = PickOfWeek.admin_grid(params).order(sort_column + " " + sort_direction).
            paginate(:per_page => 25, :page => params[:page].to_i)
  end

  def new
    @pick_of_week = PickOfWeek.new
    @properties = Property.all
  end

  def create
    @pick_of_week = PickOfWeek.new(params[:pick_of_week])

    if @pick_of_week.save
      flash[:notice] = "Success, You should create a pick of the week."
      redirect_to edit_admin_merchandise_pick_of_week_url(@pick_of_week)
    else
      form_info
      flash[:error] = "The pick of the week could not be saved"
      render :action => :new
    end
  end

  def edit
    @pick_of_week = PickOfWeek.find params[:id]
    @properties = Property.all
  end

  def update
    @pick_of_week = PickOfWeek.find params[:id]

    if @pick_of_week.update_attributes(params[:pick_of_week])
      redirect_to admin_merchandise_pick_of_weeks_url
    else
      form_info
      render :action => :edit
    end
  end

  def sort_column
    PickOfWeek.column_names.include?(params[:sort]) ? params[:sort] : "name"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
  
end
