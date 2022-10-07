class CreateSubgeographicHierarchies < ActiveRecord::Migration[7.0]
  def change
    create_table :subgeographic_hierarchies, id: false do |t|
      t.references :ancestor, null: false, foreign_key: {on_delete: :cascade, to_table: :subgeographics}, type: :uuid
      t.references :descendant, null: false, foreign_key: {on_delete: :cascade, to_table: :subgeographics}, type: :uuid
      t.integer :generations, null: false
    end

    add_index :subgeographic_hierarchies, [:ancestor_id, :descendant_id, :generations], unique: true, name: "subgeographic_anc_desc_idx"
    add_index :subgeographic_hierarchies, [:descendant_id], name: "subgeographic_desc_idx"

    Subgeographic.rebuild!
  end
end
