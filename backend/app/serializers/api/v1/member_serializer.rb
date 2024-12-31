module API
  module V1
    class MemberSerializer < BaseSerializer
      attributes :id, :email, :first_name, :last_name, :created_at, :updated_at

      belongs_to_restricted :funder
    end
  end
end
