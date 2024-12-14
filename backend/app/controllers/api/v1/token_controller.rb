module API
  module V1
    class TokenController < BaseController
      def create
        member = Member.find_by_email params[:email]

        if member&.valid_password?(params[:password])
          render json: {token: JWTAuth.encode(member)}
        else
          raise API::UnprocessableEntityError, I18n.t("devise.failure.invalid", authentication_keys: :email)
        end
      end
    end
  end
end
