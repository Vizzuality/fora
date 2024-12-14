module API
  module V1
    class ResetPasswordsController < BaseController
      def create
        Member.send_reset_password_instructions(create_params)
        head :ok
      end

      def update
        member = Member.reset_password_by_token(update_params)
        if member.errors.empty?
          render json: {token: JWTAuth.encode(member)}
        else
          render_validation_errors member
        end
      end

      private

      def create_params
        params.permit(:email)
      end

      def update_params
        params.permit(:reset_password_token, :password, :password_confirmation)
      end
    end
  end
end
