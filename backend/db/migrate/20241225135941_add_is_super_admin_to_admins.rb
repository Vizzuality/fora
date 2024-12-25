class AddIsSuperAdminToAdmins < ActiveRecord::Migration[7.0]
  def change
    add_column :admins, :is_super_admin, :boolean, default: false
  end
end
