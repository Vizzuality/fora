module Backoffice
  class AdminsController < BaseController
    include AsResource

    def update
      admin = current_admin
      super do |resource|
        bypass_sign_in resource if resource == admin # don't logout current admin when he changes its password
      end
    end

    private

    def create_params
      params.require(:admin).permit(
        :first_name,
        :last_name,
        :email,
        :password,
        :password_confirmation
      )
    end

    def update_params
      p = create_params
      p[:password].blank? ? p.except(:password, :password_confirmation) : p
    end
  end
end
