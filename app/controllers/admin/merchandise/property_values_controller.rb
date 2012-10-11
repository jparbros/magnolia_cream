class Admin::Merchandise::PropertyValuesController < Admin::BaseController

  helper_method :sort_column, :sort_direction

  def index
    @property = Property.find(params[:property_id])
    @property_values =  @property.property_values.admin_grid(params).order(sort_column + " " + sort_direction).
                                              paginate(:per_page => 20, :page => params[:page] || 1)
  end
  
  def new
    @property_value = PropertyValue.new
  end
  
  def create
    @property = Property.find(params[:property_id])
    @property_value = @property.property_values.new(params[:property_value])
    if @property_value.save
      redirect_to :action => :index
    else
      flash[:error] = "The property value could not be saved"
      render :action => :new
    end
  end

  def edit
    @property_value = PropertyValue.find(params[:id])
  end

  def update
    @property_value = PropertyValue.find(params[:id])
    if @property_value.update_attributes(params[:property_value])
      redirect_to :action => :index
    else
      render :action => :edit
    end
  end

  def destroy
    @property_value = PropertyValue.find(params[:id])
    @property_value.active = false
    @property_value.save

    redirect_to :action => :index
  end
  
  private

  def sort_column
    PropertyValue.column_names.include?(params[:sort]) ? params[:sort] : "identifing_name"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end
end
