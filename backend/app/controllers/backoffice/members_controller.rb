module Backoffice
  class MembersController < BaseController
    include AsResource

    def create
      super do |resource|
        MemberMailer.first_time_login_instructions(resource).deliver_later
      end
    end

    private

    def create_params
      p = GeneratePassword.new(50).call
      params.require(:member).permit(
        :funder_id,
        :first_name,
        :last_name,
        :email
      ).merge password: p, password_confirmation: p
    end
  end
end
