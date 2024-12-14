class JWTAuth
  ALGORITHM = "HS256".freeze
  SECRET = Rails.application.secrets.secret_key_base

  def self.encode(member)
    payload = {
      member_id: member.id,
      exp: 1.week.from_now.to_i
    }
    JWT.encode payload, SECRET, ALGORITHM
  end

  def self.decode(token)
    payload = JWT.decode(token, SECRET, true, {algorithm: ALGORITHM}).first
    Member.find payload["member_id"]
  rescue JWT::ExpiredSignature, JWT::DecodeError, ActiveRecord::RecordNotFound
    nil
  end
end
