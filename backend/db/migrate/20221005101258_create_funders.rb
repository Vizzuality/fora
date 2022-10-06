class CreateFunders < ActiveRecord::Migration[7.0]
  def change
    create_table :funders, id: :uuid do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :primary_office_address, null: false
      t.string :primary_office_city, null: false
      t.belongs_to :primary_office_state, foreign_key: {on_delete: :cascade, to_table: :subgeographics}, type: :uuid
      t.belongs_to :primary_office_country, null: false, foreign_key: {on_delete: :cascade, to_table: :subgeographics}, type: :uuid
      t.string :primary_contact_first_name, null: false
      t.string :primary_contact_last_name, null: false
      t.string :primary_contact_email, null: false
      t.boolean :show_primary_email, null: false, default: false
      t.string :primary_contact_phone, null: false
      t.string :primary_contact_location, null: false
      t.string :primary_contact_role, null: false
      t.string :secondary_email_which_can_be_shared
      t.string :website
      t.datetime :date_joined_fora, null: false
      t.string :funder_type, null: false
      t.text :funder_type_other
      t.string :capital_acceptances, array: true, null: false
      t.text :capital_acceptances_other
      t.string :leadership_demographics, array: true, null: false
      t.text :leadership_demographics_other
      t.integer :number_staff_employees, null: false, default: 0
      t.string :application_status, null: false
      t.string :funder_legal_status, null: false
      t.text :funder_legal_status_other
      t.boolean :new_to_regenerative_ag, null: false, default: true
      t.text :networks
      t.string :capital_types, array: true, null: false
      t.text :capital_types_other
      t.boolean :spend_down_strategy, null: false, default: false
      t.string :areas, array: true, null: false
      t.text :areas_other
      t.string :demographics, array: true, null: false
      t.text :demographics_other

      t.index :name, unique: true

      t.timestamps
    end
  end
end
