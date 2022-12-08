class MoveRecipientSubgeographicsToInvestment < ActiveRecord::Migration[7.0]
  def change
    create_investment_subgeographics!
    copy_recipient_subgeographics!
    drop_table :recipient_subgeographics
  end

  private

  def create_investment_subgeographics!
    create_table :investment_subgeographics, id: :uuid do |t|
      t.references :investment, null: false, foreign_key: {on_delete: :cascade}, type: :uuid
      t.references :subgeographic, null: false, foreign_key: {on_delete: :cascade}, type: :uuid

      t.timestamps
    end
  end

  def copy_recipient_subgeographics!
    query = <<-SQL
      INSERT INTO investment_subgeographics (investment_id, subgeographic_id, created_at, updated_at)
      SELECT investments.id, recipient_subgeographics.subgeographic_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      FROM recipient_subgeographics
      INNER JOIN recipients
      ON recipients.id = recipient_subgeographics.recipient_id
      INNER JOIN projects
      ON projects.recipient_id = recipients.id
      INNER JOIN investments
      ON investments.project_id = projects.id
    SQL
    execute query
  end
end
