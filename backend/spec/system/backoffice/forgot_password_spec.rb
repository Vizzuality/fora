require "system_helper"

RSpec.describe "Backoffice: Forgot Password", type: :system do
  let!(:admin) { create :admin }

  describe "Forgot password" do
    before do
      visit "/backoffice"
      click_on t("backoffice.sign_in.forgot_password")
    end

    context "when user with provided email exists" do
      it "informs user that email with instructions was send" do
        expect {
          fill_in "admin[email]", with: admin.email
          click_on t("backoffice.forgot_password.button")

          expect(page).to have_text(t("devise.passwords.send_paranoid_instructions"))
        }.to have_enqueued_mail(Devise::Mailer, :reset_password_instructions).with admin, String, {}
      end
    end

    context "when user with provided email does not exists" do
      it "informs user that if email exists, it will receive instructions - paranoid" do
        expect {
          fill_in "admin[email]", with: "WRONG EMAIL"
          click_on t("backoffice.forgot_password.button")

          expect(page).to have_text(t("devise.passwords.send_paranoid_instructions"))
        }.not_to have_enqueued_mail Devise::Mailer, :reset_password_instructions
      end
    end
  end

  describe "Change password" do
    let!(:token) { admin.send :set_reset_password_token }

    context "when provided password is correct" do
      before do
        visit edit_admin_password_path reset_password_token: token
        fill_in "admin[password]", with: "Digit@ta12023333"
        fill_in "admin[password_confirmation]", with: "Digit@ta12023333"
        click_on t("backoffice.change_password.button")
      end

      it "login user" do
        expect(page).to have_text(t("backoffice.layout.sign_out"))
      end
    end

    context "when provided password is too weak" do
      before do
        visit edit_admin_password_path reset_password_token: token
        fill_in "admin[password]", with: "TOO_WEAK"
        fill_in "admin[password_confirmation]", with: "TOO_WEAK"
        click_on t("backoffice.change_password.button")
      end

      it "shows error message" do
        expect(page).to have_text(t("simple_form.error_notification.default_message"))
        expect(page).to have_text(t("activerecord.errors.models.admin.attributes.password.password_complexity"))
        expect(page).not_to have_text(t("backoffice.layout.sign_out"))
      end
    end

    context "when provided token is wrong" do
      before do
        visit edit_admin_password_path reset_password_token: "WRONG_TOKEN"
        fill_in "admin[password]", with: "Digit@ta12023333"
        fill_in "admin[password_confirmation]", with: "Digit@ta12023333"
        click_on t("backoffice.change_password.button")
      end

      it "shows error message" do
        expect(page).to have_text("Reset password token is invalid")
        expect(page).not_to have_text(t("backoffice.layout.sign_out"))
      end
    end
  end
end
