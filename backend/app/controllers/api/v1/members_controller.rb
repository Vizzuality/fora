module API
  module V1
    class MembersController < BaseController
      load_and_authorize_resource except: :sign_in

      def me
        render json: API::V1::MemberSerializer.new(current_member).serializable_hash
      end

      def update
        if @member.update(member_params)
          render json: API::V1::MemberSerializer.new(@member).serializable_hash
        else
          raise API::UnprocessableEntityError, @member.errors.full_messages.to_sentence
        end
      end

      def sign_in
        member = Member.find_by_email params[:email]

        if member&.valid_password?(params[:password])
          render json: {token: JWTAuth.encode(member)}
        else
          raise API::UnprocessableEntityError, I18n.t("devise.failure.invalid", authentication_keys: :email)
        end
      end

      private

      def member_params
        p = params.permit :first_name, :last_name, :email, :password, :password_confirmation
        p[:password].blank? ? p.except(:password, :password_confirmation) : p
      end
    end
  end
end
