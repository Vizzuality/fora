class MakePrimaryContactDataOptional < ActiveRecord::Migration[7.0]
  def change
    change_column_null :funders, :primary_contact_phone, true
    change_column_null :funders, :primary_contact_location, true
    change_column_null :funders, :primary_contact_role, true
    change_column_null :funders, :primary_office_address, true
  end
end
