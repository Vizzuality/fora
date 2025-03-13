class RemoveUniqueConstraintForRecipientName < ActiveRecord::Migration[7.0]
  def change
    remove_index :recipients, :name
  end
end
