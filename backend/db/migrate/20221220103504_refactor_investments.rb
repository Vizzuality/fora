class RefactorInvestments < ActiveRecord::Migration[7.0]
  def change
    add_new_columns!
    migrate_data!
    remove_old_columns!
  end

  private

  def add_new_columns!
    add_column :investments, :capital_type, :string, null: true
    add_column :investments, :capital_type_other, :string, null: true
    add_column :investments, :submitting_organization_contact_name, :string, null: true
    add_column :investments, :privacy, :string, null: true
  end

  def migrate_data!
    Investment.all.each do |investment|
      investment.capital_type = investment.capital_types.first
      investment.privacy = "aggregate_amount_funded"
      investment.save!
    end
    change_column_null :investments, :capital_type, false
    change_column_null :investments, :privacy, false
    change_column_null :investments, :funding_type, true
  end

  def remove_old_columns!
    remove_column :investments, :visible
    remove_column :investments, :grant_duration_other
    remove_column :investments, :capital_types
  end
end
