require "rails_helper"

RSpec.describe MemberMailer, type: :mailer do
  include ActionView::Helpers::UrlHelper

  let(:member) { create :member }

  describe ".first_time_login_instructions" do
    let(:mail) { MemberMailer.first_time_login_instructions member }

    it "renders the headers" do
      expect(mail.subject).to eq(I18n.t("member_mailer.first_time_login_instructions.subject"))
      expect(mail.to).to eq([member.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match(I18n.t("member_mailer.greetings", full_name: member.full_name))
      expect(mail.body.encoded).to match(I18n.t("member_mailer.first_time_login_instructions.content_html", reset_password_link: ""))
      expect(mail.body.encoded).to match(I18n.t("member_mailer.first_time_login_instructions.reset_password_link"))
      expect(mail.body.encoded).to match(I18n.t("member_mailer.farewell_html"))
    end
  end
end
