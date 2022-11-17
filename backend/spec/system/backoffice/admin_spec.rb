require "system_helper"

RSpec.describe "Backoffice: Admins", type: :system do
  let!(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:extra_admin) { create(:admin) }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/admins" }

    it_behaves_like "with table pagination", expected_total: 2
    it_behaves_like "with table sorting", columns: [
      I18n.t("activerecord.attributes.admin.full_name"),
      I18n.t("activerecord.attributes.admin.email"),
      I18n.t("activerecord.attributes.admin.created_at")
    ]

    it "shows admins list" do
      within_row(admin.full_name) do
        expect(page).to have_text(admin.email)
        expect(page).to have_text(I18n.l(admin.created_at.to_date))
      end
      within_row(extra_admin.full_name) do
        expect(page).to have_text(extra_admin.email)
        expect(page).to have_text(I18n.l(extra_admin.created_at.to_date))
      end
    end

    context "when deleting admin via menu" do
      it "deletes admin" do
        within_row(extra_admin.full_name) do
          find("button.rounded-full").click
          accept_confirm do
            click_on t("backoffice.actions.delete")
          end
        end
        expect(page).not_to have_text(extra_admin.full_name)
      end
    end
  end

  describe "Show" do
    before do
      visit "/backoffice/admins"
      within_row(admin.full_name) do
        click_on t("backoffice.actions.show")
      end
    end

    it "contains all information about admin" do
      expect(page).to have_text(Admin.human_attribute_name(:first_name))
      expect(page).to have_text(Admin.human_attribute_name(:last_name))
      expect(page).to have_text(Admin.human_attribute_name(:email))
      expect(page).to have_text(Admin.human_attribute_name(:created_at))
      expect(page).to have_text(Admin.human_attribute_name(:updated_at))

      expect(page).to have_text(admin.first_name)
      expect(page).to have_text(admin.last_name)
      expect(page).to have_text(admin.email)
      expect(page).to have_text(I18n.l(admin.created_at))
      expect(page).to have_text(I18n.l(admin.updated_at))
    end
  end

  describe "New" do
    let(:new_admin) { Admin.order(created_at: :desc).first }

    before do
      visit "/backoffice/admins"
      click_on t("backoffice.messages.create_new_record", model: Admin.model_name.human)
    end

    context "when provided data are correct" do
      before do
        fill_in "admin[email]", with: "new_email@admin.admin"
        fill_in "admin[first_name]", with: "New First Name"
        fill_in "admin[last_name]", with: "New Last Name"
        fill_in "admin[password]", with: "NewP@ssword123456"
        fill_in "admin[password_confirmation]", with: "NewP@ssword123456"
        click_on t("backoffice.actions.save")
      end

      it "shows data of new admin" do
        expect(page).to have_current_path(backoffice_admin_path(new_admin))
        expect(page).to have_text(t("backoffice.messages.success_create", model: Admin.model_name.human))
        expect(page).to have_text("new_email@admin.admin")
        expect(page).to have_text("New First Name")
        expect(page).to have_text("New Last Name")
      end
    end

    context "when provided data are incorrect" do
      before do
        fill_in "admin[password]", with: "NewP@ssword123456"
        fill_in "admin[password_confirmation]", with: "different_password"
        click_on t("backoffice.actions.save")
      end

      it "shows validation errors" do
        expect(page).to have_current_path(new_backoffice_admin_path)
        expect(page).to have_text(t("simple_form.error_notification.default_message"))
        expect(page).to have_text("Password confirmation doesn't match Password")
      end
    end
  end

  describe "Edit" do
    before do
      visit "/backoffice/admins"
      within_row(admin.full_name) do
        find("button.rounded-full").click
        click_on t("backoffice.actions.edit")
      end
    end

    context "when provided data are correct" do
      before do
        fill_in "admin[email]", with: "new_email@admin.admin"
        fill_in "admin[first_name]", with: "New First Name"
        fill_in "admin[last_name]", with: "New Last Name"
        fill_in "admin[password]", with: "NewP@ssword123456"
        fill_in "admin[password_confirmation]", with: "NewP@ssword123456"
        click_on t("backoffice.actions.save")
      end

      it "shows update data of admin" do
        expect(page).to have_current_path(backoffice_admin_path(admin))
        expect(page).to have_text(t("backoffice.messages.success_update", model: Admin.model_name.human))
        expect(page).to have_text("new_email@admin.admin")
        expect(page).to have_text("New First Name")
        expect(page).to have_text("New Last Name")
      end
    end

    context "when provided data are incorrect" do
      before do
        fill_in "admin[password]", with: "NewP@ssword123456"
        fill_in "admin[password_confirmation]", with: "different_password"
        click_on t("backoffice.actions.save")
      end

      it "shows validation errors" do
        expect(page).to have_current_path(edit_backoffice_admin_path(admin))
        expect(page).to have_text(t("simple_form.error_notification.default_message"))
        expect(page).to have_text("Password confirmation doesn't match Password")
      end
    end
  end

  describe "Delete" do
    before do
      visit "/backoffice/admins"
      within_row(extra_admin.full_name) do
        click_on t("backoffice.actions.show")
      end
    end

    it "deletes admin" do
      accept_confirm do
        click_on t("backoffice.actions.delete")
      end
      expect(page).not_to have_text(extra_admin.full_name)
    end
  end
end
