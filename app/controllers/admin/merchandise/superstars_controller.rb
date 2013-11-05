class Admin::Merchandise::SuperstarsController < Admin::BaseController
  
  helper_method :sort_column, :sort_direction
  
  def index
    params[:page] ||= 1
    @superstars = Superstar.admin_grid(params).order(sort_column + " " + sort_direction).
            paginate(:per_page => 25, :page => params[:page].to_i)
  end
  
  def new
    @superstar = Superstar.new
    @properties = Property.all
  end
  
  def create
    @superstar = Superstar.new(params[:superstar])

    if @superstar.save
      flash[:notice] = "Success, You should create a superstar."
      redirect_to edit_admin_merchandise_superstar_url(@superstar)
    else
      form_info
      flash[:error] = "The superstar could not be saved"
      render :action => :new
    end
  end
  
  def edit
    @superstar = Superstar.find params[:id]
    @properties = Property.all
  end
  
  def update
    @superstar = Superstar.find params[:id]

    if @superstar.update_attributes(params[:superstar])
      redirect_to admin_merchandise_superstars_url
    else
      form_info
      render :action => :edit
    end
  end
  
  def sort_column
    Superstar.column_names.include?(params[:sort]) ? params[:sort] : "name"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
  
end
