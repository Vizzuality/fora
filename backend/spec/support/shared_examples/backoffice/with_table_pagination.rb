RSpec.shared_examples "with table pagination" do |expected_total:|
  describe "Paginated" do
    it "shows page navigation" do
      expect(page).to have_css "table.backoffice-table tbody tr", count: expected_total
      within ".pagination .active" do
        expect(page).to have_text("1")
      end
    end
  end
end
