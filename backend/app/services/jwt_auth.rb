class JWTAuth
  ALGORITHM = "HS256".freeze
  SECRET = ENV["JWT_SECRET"]

  def self.encode(member)
    payload = {
      member_id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      exp: 1.week.from_now.to_i
    }
    JWT.encode payload, SECRET, ALGORITHM
  end

  def self.decode(token)
    return nil if token.blank?

    payload = JWT.decode(token, SECRET, true, {algorithm: ALGORITHM}).first
    Member.find payload["member_id"]
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    nil
  end
end
