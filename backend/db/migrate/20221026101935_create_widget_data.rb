class CreateWidgetData < ActiveRecord::Migration[7.0]
  def change
    create_table :widget_data, id: :uuid do |t|
      t.belongs_to :widget, null: false, foreign_key: {on_delete: :cascade}, type: :uuid
      t.string :filter_key
      t.jsonb :data, null: false, default: {}

      t.index [:filter_key, :widget_id], unique: true

      t.timestamps
    end
  end
end
