class CreateRecipients < ActiveRecord::Migration[7.0]
  def change
    create_table :recipients, id: :uuid do |t|
      t.string :name, null: false
      t.string :contact_first_name
      t.string :contact_last_name
      t.string :website
      t.belongs_to :country, null: false, foreign_key: {on_delete: :cascade, to_table: :subgeographics}, type: :uuid
      t.belongs_to :state, foreign_key: {on_delete: :cascade, to_table: :subgeographics}, type: :uuid
      t.string :city
      t.string :leadership_demographics, array: true
      t.text :leadership_demographics_other
      t.string :demographics, array: true, null: false
      t.text :demographics_other
      t.string :recipient_legal_status
      t.text :recipient_legal_status_other

      t.index :name, unique: true

      t.timestamps
    end
  end
end
