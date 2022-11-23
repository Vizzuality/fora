require "system_helper"

RSpec.describe "Backoffice: Uploads", type: :system do
  let!(:admin) { create(:admin, email: "admin@example.com", password: "SuperSecret6", first_name: "Admin", last_name: "Example") }
  let!(:upload) { create :upload }

  before { sign_in admin }

  describe "Index" do
    before { visit "/backoffice/uploads" }

    it_behaves_like "with table pagination", expected_total: 1
    it_behaves_like "with table sorting", columns: [
      I18n.t("activerecord.attributes.upload.id"),
      I18n.t("activerecord.attributes.upload.status"),
      I18n.t("activerecord.attributes.upload.created_by"),
      I18n.t("activerecord.attributes.upload.created_at")
    ]

    it "shows uploads list" do
      within_row(upload.id) do
        expect(page).to have_text(upload.status)
        expect(page).to have_text(upload.created_by.full_name)
        expect(page).to have_text(I18n.l(upload.created_at.to_date))
      end
    end

    context "when deleting upload via menu" do
      it "deletes upload" do
        within_row(upload.id) do
          find("button.rounded-full").click
          accept_confirm do
            click_on t("backoffice.actions.delete")
          end
        end
        expect(page).not_to have_text(upload.id)
      end
    end
  end

  describe "Show" do
    before do
      visit "/backoffice/uploads"
      within_row(upload.id) do
        click_on t("backoffice.actions.show")
      end
    end

    it "contains all information about upload" do
      expect(page).to have_text(Upload.human_attribute_name(:status))
      expect(page).to have_text(Upload.human_attribute_name(:created_by))
      expect(page).to have_text(Upload.human_attribute_name(:file))
      expect(page).to have_text(Upload.human_attribute_name(:created_at))
      expect(page).to have_text(Upload.human_attribute_name(:updated_at))

      expect(page).to have_text(upload.status)
      expect(page).to have_text(upload.created_by.full_name)
      expect(page).to have_text(upload.file.filename)
      expect(page).to have_text(I18n.l(upload.created_at))
      expect(page).to have_text(I18n.l(upload.updated_at))
    end
  end

  describe "New" do
    let(:new_upload) { Upload.order(created_at: :desc).first }

    before do
      visit "/backoffice/uploads"
      click_on t("backoffice.messages.create_new_record", model: Upload.model_name.human)
    end

    context "when provided data are correct" do
      it "shows data of new upload" do
        expect {
          attach_file "upload[file]", Rails.root.join("spec/fixtures/files/upload.zip")
          click_on t("backoffice.actions.save")
        }.to have_enqueued_job(ProcessUploadJob).with(Upload)
        expect(page).to have_current_path(backoffice_upload_path(new_upload))
        expect(page).to have_text(t("backoffice.messages.success_create", model: Upload.model_name.human))
        expect(page).to have_text("upload.zip")
        expect(page).to have_text(admin.full_name)
      end
    end

    context "when provided data are incorrect" do
      it "shows validation errors" do
        expect {
          attach_file "upload[file]", Rails.root.join("spec/fixtures/files/picture.jpg")
          click_on t("backoffice.actions.save")
        }.not_to have_enqueued_job(ProcessUploadJob)
        expect(page).to have_current_path(new_backoffice_upload_path)
        expect(page).to have_text(t("simple_form.error_notification.default_message"))
        expect(page).to have_text("File has an invalid content type")
      end
    end
  end

  describe "Delete" do
    before do
      visit "/backoffice/uploads"
      within_row(upload.id) do
        click_on t("backoffice.actions.show")
      end
    end

    it "deletes upload" do
      accept_confirm do
        click_on t("backoffice.actions.delete")
      end
      expect(page).not_to have_text(upload.id)
    end
  end
end
