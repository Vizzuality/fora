class AddAbbreviationToSubgeographics < ActiveRecord::Migration[7.0]
  def change
    add_index :subgeographics, [:code, :geographic], unique: true

    add_column :subgeographics, :abbreviation, :string, as: "UPPER(LEFT(geographic,1)) || '-' || code", stored: true
  end
end
