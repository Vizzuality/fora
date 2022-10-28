class CreateWidgets < ActiveRecord::Migration[7.0]
  def change
    create_table :widgets, id: :uuid do |t|
      t.string :report_pages, array: true, null: false
      t.string :report_year, null: false
      t.string :widget_type, null: false
      t.string :slug, null: false
      t.integer :position, null: false
      t.boolean :support_filters, null: false, default: false
      t.string :title, null: false
      t.text :description

      t.index [:slug, :report_year], unique: true

      t.timestamps
    end
  end
end
