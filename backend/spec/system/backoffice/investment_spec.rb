require "system_helper"

RSpec.describe "Backoffice: Investments", type: :system do
  let!(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:investment) { create :investment }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/investments" }

    it_behaves_like "with table pagination", expected_total: 1
    it_behaves_like "with table sorting", columns: [
      I18n.t("activerecord.attributes.investment.id"),
      I18n.t("activerecord.attributes.investment.funder"),
      I18n.t("activerecord.attributes.investment.project"),
      I18n.t("activerecord.attributes.investment.updated_at"),
      I18n.t("activerecord.attributes.investment.created_at")
    ]
    it_behaves_like "with csv export", file_name: "investments.csv"

    it "shows investments list" do
      within_row(investment.id) do
        expect(page).to have_text(investment.funder.name)
        expect(page).to have_text(investment.project.name)
        expect(page).to have_text(I18n.l(investment.updated_at.to_date))
        expect(page).to have_text(I18n.l(investment.created_at.to_date))
      end
    end
  end

  describe "Show" do
    let!(:investment) { create :investment }

    before do
      visit "/backoffice/investments"
      within_row(investment.id) do
        click_on t("backoffice.actions.show")
      end
    end

    it "contains all information about investment" do
      expect(page).to have_text(Investment.human_attribute_name(:funder))
      expect(page).to have_text(Investment.human_attribute_name(:project))
      expect(page).to have_text(Investment.human_attribute_name(:created_at))
      expect(page).to have_text(Investment.human_attribute_name(:updated_at))

      expect(page).to have_text(investment.funder.name)
      expect(page).to have_text(investment.project.name)
      expect(page).to have_text(I18n.l(investment.created_at))
      expect(page).to have_text(I18n.l(investment.updated_at))
    end
  end
end
