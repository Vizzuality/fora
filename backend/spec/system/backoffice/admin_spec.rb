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
end
