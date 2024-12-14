class AddPublishedToFunders < ActiveRecord::Migration[7.0]
  def change
    add_column :funders, :published, :boolean, default: false

    change_column_null :funders, :description, true
    change_column_null :funders, :primary_office_city, true
    change_column_null :funders, :primary_contact_first_name, true
    change_column_null :funders, :primary_contact_last_name, true
    change_column_null :funders, :primary_contact_email, true
    change_column_null :funders, :date_joined_fora, true
    change_column_null :funders, :number_staff_employees, true
    change_column_null :funders, :primary_office_country_id, true
    change_column_null :funders, :funder_type, true
    change_column_null :funders, :capital_acceptances, true
    change_column_null :funders, :leadership_demographics, true
    change_column_null :funders, :application_status, true
    change_column_null :funders, :funder_legal_status, true
    change_column_null :funders, :capital_types, true
    change_column_null :funders, :areas, true
    change_column_null :funders, :demographics, true
  end
end
