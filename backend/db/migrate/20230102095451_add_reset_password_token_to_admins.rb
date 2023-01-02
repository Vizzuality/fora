class AddResetPasswordTokenToAdmins < ActiveRecord::Migration[7.0]
  def change
    add_column :admins, :reset_password_token, :string
    add_column :admins, :reset_password_sent_at, :datetime
    add_index :admins, :reset_password_token, unique: true
  end
end
