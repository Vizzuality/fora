class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects, id: :uuid do |t|
      t.string :name
      t.text :description
      t.belongs_to :recipient, foreign_key: {on_delete: :cascade}, type: :uuid

      t.index :name, unique: true, where: "name IS NOT NULL"

      t.timestamps
    end
  end
end
