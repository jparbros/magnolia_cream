class Superstar < ItemPrototype
  
  def self.admin_grid(params = {}, active_state = nil)

    params[:page] ||= 1
    params[:rows] ||= SETTINGS[:admin_grid_rows]

    grid = self
    grid = grid.where("item_protypes.name LIKE ?", "#{params[:name]}%") if params[:name].present?
    grid = grid.where("item_protypes.available_at > ?", params[:available_at_gt]) if params[:available_at_gt].present?
    grid = grid.where("item_protypes.available_at < ?", params[:available_at_lt]) if params[:available_at_lt].present?
    grid
  end
end
