class RefactorWidgets < ActiveRecord::Migration[7.0]
  def change
    drop_table :widget_data
    remove_column :widgets, :support_filters
    change_column_null :widgets, :title, true
    change_column :widgets, :report_year, :integer, using: "report_year::integer"
  end
end
