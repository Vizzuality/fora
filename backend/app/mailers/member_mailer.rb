class MemberMailer < ApplicationMailer
  def first_time_login_instructions(member)
    @member = member
    @token = set_reset_password_token member

    mail to: member.email
  end

  private

  def set_reset_password_token(member)
    raw, enc = Devise.token_generator.generate(Member, :reset_password_token)

    member.reset_password_token = enc
    member.reset_password_sent_at = Time.current
    member.save validate: false
    raw
  end
end
