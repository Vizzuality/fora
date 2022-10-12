class CreateInvestments < ActiveRecord::Migration[7.0]
  def change
    create_table :investments, id: :uuid do |t|
      t.belongs_to :project, null: false, foreign_key: {on_delete: :cascade}, type: :uuid
      t.belongs_to :funder, null: false, foreign_key: {on_delete: :cascade}, type: :uuid
      t.boolean :visible, null: false, default: false
      t.decimal :amount, null: false, precision: 15, scale: 4
      t.integer :year_invested, null: false
      t.integer :initial_funded_year, null: false
      t.string :funding_type, null: false
      t.text :funding_type_other
      t.string :capital_types, array: true, null: false
      t.string :areas, array: true, null: false
      t.text :areas_other
      t.string :grant_duration, null: false
      t.text :grant_duration_other
      t.integer :number_of_grant_years

      t.timestamps
    end
  end
end
