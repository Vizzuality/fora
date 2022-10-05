class CreateSubgeographicGeometries < ActiveRecord::Migration[7.0]
  def change
    create_table :subgeographic_geometries, id: :uuid do |t|
      t.geometry :geometry, null: false

      t.timestamps
    end
  end
end
