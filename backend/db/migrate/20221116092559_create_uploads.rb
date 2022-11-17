class CreateUploads < ActiveRecord::Migration[7.0]
  def change
    create_table :uploads, id: :uuid do |t|
      t.belongs_to :created_by, null: false, foreign_key: {on_delete: :cascade, to_table: :admins}, type: :uuid
      t.integer :status, null: false, default: 0
      t.string :error_messages, array: true, default: []

      t.timestamps
    end
  end
end
