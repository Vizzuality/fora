class AddMemberToProjects < ActiveRecord::Migration[7.0]
  def change
    add_reference :projects, :member, null: true, foreign_key: true, type: :uuid
  end
end
