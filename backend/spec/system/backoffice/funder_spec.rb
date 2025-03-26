require "system_helper"

RSpec.describe "Backoffice: Funders", type: :system do
  let!(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:funder) { create :funder }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/funders" }

    it_behaves_like "with table pagination", expected_total: 1
    it_behaves_like "with table sorting", columns: [
      I18n.t("activerecord.attributes.project.id"),
      I18n.t("activerecord.attributes.funder.name"),
      I18n.t("activerecord.attributes.funder.updated_at"),
      I18n.t("activerecord.attributes.funder.created_at")
    ]
    it_behaves_like "with csv export", file_name: "funders.csv"

    it "shows funders list" do
      within_row(funder.id) do
        expect(page).to have_text(funder.name)
        expect(page).to have_text(I18n.l(funder.updated_at.to_date))
        expect(page).to have_text(I18n.l(funder.created_at.to_date))
      end
    end

    context "when deleting upload via menu" do
      it "deletes upload" do
        within_row(funder.id) do
          find("button.rounded-full").click
          accept_confirm do
            click_on t("backoffice.actions.delete")
          end
        end
        expect(page).not_to have_text(funder.id)
      end
    end
  end

  describe "Show" do
    let(:error) { "THIS IS ERROR" }
    let!(:upload) { create :upload, error_messages: [error] }

    before do
      visit "/backoffice/funders"
      within_row(funder.id) do
        click_on t("backoffice.actions.show")
      end
    end

    it "contains all information about funder" do
      expect(page).to have_text(Funder.human_attribute_name(:name))
      expect(page).to have_text(Funder.human_attribute_name(:created_at))
      expect(page).to have_text(Funder.human_attribute_name(:updated_at))

      expect(page).to have_text(funder.name)
      expect(page).to have_text(I18n.l(funder.created_at))
      expect(page).to have_text(I18n.l(funder.updated_at))
    end
  end

  describe "New" do
    let(:new_funder) { Funder.order(created_at: :desc).first }

    before do
      visit "/backoffice/funders"
      click_on t("backoffice.messages.create_new_record", model: Funder.model_name.human)
    end

    context "when provided data are correct" do
      it "shows data of new funder" do
        fill_in Funder.human_attribute_name(:name), with: "New Funder"
        click_on t("backoffice.actions.save")
        expect(page).to have_current_path(backoffice_funder_path(new_funder))
        expect(page).to have_text(t("backoffice.messages.success_create", model: Funder.model_name.human))
        expect(page).to have_text(new_funder.name)
      end
    end

    context "when provided data are incorrect" do
      it "shows validation errors" do
        click_on t("backoffice.actions.save")
        expect(page).to have_current_path(new_backoffice_funder_path)
        expect(page).to have_text(t("simple_form.error_notification.default_message"))
        expect(page).to have_text("Name can't be blank")
      end
    end
  end

  describe "Delete" do
    let!(:funder) { create :funder, investments: [create(:investment)] }

    before do
      visit "/backoffice/funders"
      within_row(funder.id) do
        click_on t("backoffice.actions.show")
      end
    end

    it "deletes funder" do
      accept_confirm do
        click_on t("backoffice.actions.delete")
      end
      expect(page).not_to have_text(funder.id)
    end
  end
end
