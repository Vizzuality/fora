require "system_helper"

RSpec.describe "Backoffice: Projects", type: :system do
  let!(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:project) { create :project }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/projects" }

    it_behaves_like "with table pagination", expected_total: 1
    it_behaves_like "with table sorting", columns: [
      I18n.t("activerecord.attributes.project.id"),
      I18n.t("activerecord.attributes.recipient.name"),
      I18n.t("activerecord.attributes.project.updated_at"),
      I18n.t("activerecord.attributes.project.created_at")
    ]
    it_behaves_like "with csv export", file_name: "projects.csv"

    it "shows projects list" do
      within_row(project.id) do
        expect(page).to have_text(project.name)
        expect(page).to have_text(I18n.l(project.updated_at.to_date))
        expect(page).to have_text(I18n.l(project.created_at.to_date))
      end
    end

    context "when deleting member via menu" do
      it "deletes admin" do
        within_row(project.id) do
          find("button.rounded-full").click
          accept_confirm do
            click_on t("backoffice.actions.delete")
          end
        end
        expect(page).not_to have_text(project.id)
      end
    end
  end

  describe "Show" do
    let!(:project) { create :project }

    before do
      visit "/backoffice/projects"
      within_row(project.id) do
        click_on t("backoffice.actions.show")
      end
    end

    it "contains all information about project" do
      expect(page).to have_text(Project.human_attribute_name(:name))
      expect(page).to have_text(Project.human_attribute_name(:created_at))
      expect(page).to have_text(Project.human_attribute_name(:updated_at))

      expect(page).to have_text(project.name)
      expect(page).to have_text(I18n.l(project.created_at))
      expect(page).to have_text(I18n.l(project.updated_at))
    end
  end

  describe "Delete" do
    let!(:project) { create :project, investments: [create(:investment)] }

    before do
      visit "/backoffice/projects"
      within_row(project.id) do
        click_on t("backoffice.actions.show")
      end
    end

    it "deletes project" do
      accept_confirm do
        click_on t("backoffice.actions.delete")
      end
      expect(page).not_to have_text(project.id)
    end
  end
end
