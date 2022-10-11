class CreateRecipientSubgeographics < ActiveRecord::Migration[7.0]
  def change
    create_table :recipient_subgeographics, id: :uuid do |t|
      t.references :recipient, null: false, foreign_key: {on_delete: :cascade}, type: :uuid
      t.references :subgeographic, null: false, foreign_key: {on_delete: :cascade}, type: :uuid

      t.timestamps
    end
  end
end
