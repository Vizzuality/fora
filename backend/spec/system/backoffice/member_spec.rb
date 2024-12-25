require "system_helper"

RSpec.describe "Backoffice: Members", type: :system do
  let!(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:member) { create(:member) }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/members" }

    it_behaves_like "with table pagination", expected_total: 1
    it_behaves_like "with table sorting", columns: [
      I18n.t("activerecord.attributes.member.email"),
      I18n.t("activerecord.attributes.member.first_name"),
      I18n.t("activerecord.attributes.member.last_name"),
      I18n.t("activerecord.attributes.admin.updated_at"),
      I18n.t("activerecord.attributes.admin.created_at")
    ]

    it "shows members list" do
      within_row(member.id) do
        expect(page).to have_text(member.email)
        expect(page).to have_text(member.first_name)
        expect(page).to have_text(member.last_name)
        expect(page).to have_text(I18n.l(member.updated_at.to_date))
        expect(page).to have_text(I18n.l(member.created_at.to_date))
      end
    end

    context "when deleting member via menu" do
      it "deletes admin" do
        within_row(member.id) do
          find("button.rounded-full").click
          accept_confirm do
            click_on t("backoffice.actions.delete")
          end
        end
        expect(page).not_to have_text(member.email)
      end
    end
  end

  describe "Show" do
    before do
      visit "/backoffice/members"
      within_row(member.id) do
        click_on t("backoffice.actions.show")
      end
    end

    it "contains all information about member" do
      expect(page).to have_text(Member.human_attribute_name(:funder))
      expect(page).to have_text(Member.human_attribute_name(:first_name))
      expect(page).to have_text(Member.human_attribute_name(:last_name))
      expect(page).to have_text(Member.human_attribute_name(:email))
      expect(page).to have_text(Member.human_attribute_name(:created_at))
      expect(page).to have_text(Member.human_attribute_name(:updated_at))

      expect(page).to have_text(member.funder.name)
      expect(page).to have_text(member.first_name)
      expect(page).to have_text(member.last_name)
      expect(page).to have_text(member.email)
      expect(page).to have_text(I18n.l(member.created_at))
      expect(page).to have_text(I18n.l(member.updated_at))
    end
  end

  describe "New" do
    let!(:funder) { create(:funder) }
    let(:new_member) { Member.order(created_at: :desc).first }

    before do
      visit "/backoffice/members"
      click_on t("backoffice.messages.create_new_record", model: Member.model_name.human)
    end

    context "when provided data are correct" do
      before do
        select funder.name, from: "member[funder_id]"
        fill_in "member[email]", with: "new_member@member.member"
        fill_in "member[first_name]", with: "New First Name"
        fill_in "member[last_name]", with: "New Last Name"
      end

      it "sends instructions email" do
        expect {
          click_on t("backoffice.actions.save")
        }.to have_enqueued_mail(MemberMailer, :first_time_login_instructions).once
      end

      it "shows data of new member" do
        click_on t("backoffice.actions.save")
        expect(page).to have_current_path(backoffice_member_path(new_member))
        expect(page).to have_text(t("backoffice.messages.success_create", model: Member.model_name.human))
        expect(page).to have_text(funder.name)
        expect(page).to have_text("new_member@member.member")
        expect(page).to have_text("New First Name")
        expect(page).to have_text("New Last Name")
      end
    end

    context "when provided data are incorrect" do
      before do
        fill_in "member[email]", with: "WRONG_EMAIL"
        click_on t("backoffice.actions.save")
      end

      it "shows validation errors" do
        expect(page).to have_current_path(new_backoffice_member_path)
        expect(page).to have_text(t("simple_form.error_notification.default_message"))
        expect(page).to have_text("E-mail is invalid")
      end
    end
  end

  describe "Delete" do
    before do
      visit "/backoffice/members"
      within_row(member.id) do
        click_on t("backoffice.actions.show")
      end
    end

    it "deletes member" do
      accept_confirm do
        click_on t("backoffice.actions.delete")
      end
      expect(page).not_to have_text(member.id)
    end

    context "when admin is not super admin" do
      let!(:admin) do
        create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example", is_super_admin: false)
      end

      it "does not show delete button" do
        expect(page).not_to have_text(t("backoffice.actions.delete"))
      end
    end
  end
end
