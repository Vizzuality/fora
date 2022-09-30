class CreateSubgeographics < ActiveRecord::Migration[7.0]
  def change
    create_table :subgeographics, id: :uuid do |t|
      t.belongs_to :subgeographic_geometry, foreign_key: {on_delete: :cascade}, type: :uuid
      t.belongs_to :parent, foreign_key: {on_delete: :cascade, to_table: :subgeographics}, type: :uuid
      t.string :geographic, null: false
      t.string :name, null: false
      t.string :code, null: false

      t.index [:geographic, :parent_id, :name], unique: true, where: "parent_id IS NOT NULL", name: "uniq_name_with_parent_id"
      t.index [:geographic, :name], unique: true, where: "parent_id IS NULL", name: "uniq_name_without_parent_id"

      t.timestamps
    end
  end
end
