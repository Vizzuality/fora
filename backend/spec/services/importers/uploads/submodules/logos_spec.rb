require "rails_helper"

class DummyLogosModule < Importers::Uploads::Base
  COLUMNS = {
    respondent_id: "Respondent ID",
    logo: "Logo (image)"
  }.freeze

  private

  def create_with!(attr)
    funder = FactoryBot.build :funder, logo: nil
    assign_logo_to funder, attr
    funder.save!
  end
end

RSpec.describe DummyLogosModule do
  subject { described_class.new data, images, [] }

  describe "#call - assigns logo to newly created records" do
    let(:data) { [{"Respondent ID" => "123", "Logo (image)" => "test.jpg"}] }
    let(:record) { Funder.last }

    before { subject.call }

    context "when image exists" do
      let(:images) { {"123_test.jpg" => Tempfile.new(["test", ".jpg"], binmode: true)} }

      it "is assigned to newly created record" do
        expect(record.logo).to be_attached
        expect(record.logo.filename).to eq("test.jpg")
        expect(record.logo.content_type).to eq("image/jpeg")
      end
    end

    context "when image does not exists" do
      let(:images) { {} }

      it "is not assigned to newly created record" do
        expect(record.logo).not_to be_attached
      end
    end
  end
end
