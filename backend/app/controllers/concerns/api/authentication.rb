module API
  module Authentication
    def current_member
      @current_member ||= JWTAuth.decode auth_token
    end

    def current_ability
      @current_ability ||= ::Ability.new(current_member)
    end

    def authenticate!
      raise API::UnauthorizedError, "Unauthorized" unless current_member.present?
    end

    private

    def auth_token
      header = request.headers["Authorization"]
      header&.split(" ")&.last
    end
  end
end
