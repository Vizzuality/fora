class RefactorRecipients < ActiveRecord::Migration[7.0]
  def change
    add_column :recipients, :description, :text, null: true
    migrate_description_from_projects!
    change_column_null :recipients, :description, false
    change_column_null :recipients, :contact_first_name, false
    change_column_null :recipients, :contact_last_name, false
    change_column_null :recipients, :city, false
    remove_column :projects, :name
    remove_column :projects, :description
    remove_column :recipients, :recipient_legal_status_other
  end

  private

  def migrate_description_from_projects!
    query = <<-SQL
      UPDATE recipients
      SET description = projects.description
      FROM projects
      WHERE projects.recipient_id = recipients.id
    SQL
    execute query
  end
end
