class MoveRecipientDemographicsToInvestment < ActiveRecord::Migration[7.0]
  def change
    add_column :investments, :demographics, :string, array: true
    add_column :investments, :demographics_other, :text
    copy_recipient_values!
    change_column_null :investments, :demographics, false
    remove_column :recipients, :demographics
    remove_column :recipients, :demographics_other
  end

  private

  def copy_recipient_values!
    Investment.includes(project: :recipient).each do |investment|
      investment.demographics = investment.project.recipient.demographics
      investment.demographics_other = investment.project.recipient.demographics_other
      investment.save!
    end
  end
end
