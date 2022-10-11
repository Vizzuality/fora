RSpec.shared_examples "with pagination" do |expected_total:|
  context "Pagination" do
    context "when checking first page" do
      let("page[size]") { expected_total }

      it "returns correct metadata" do
        expect(response_json["data"].size).to eq(expected_total)
        expect(response_json["meta"]["page"]).to eq(1)
        expect(response_json["meta"]["per_page"]).to eq(expected_total)
        expect(response_json["meta"]["from"]).to eq(1)
        expect(response_json["meta"]["to"]).to eq(expected_total)
        expect(response_json["meta"]["total"]).to eq(expected_total)
        expect(response_json["meta"]["pages"]).to eq(1)
      end
    end

    context "when checking other pages" do
      let("page[size]") { expected_total - 1 }
      let("page[number]") { 2 }

      it "returns correct metadata" do
        expect(response_json["data"].size).to eq(1)
        expect(response_json["meta"]["page"]).to eq(2)
        expect(response_json["meta"]["per_page"]).to eq(expected_total - 1)
        expect(response_json["meta"]["from"]).to eq(expected_total)
        expect(response_json["meta"]["to"]).to eq(expected_total)
        expect(response_json["meta"]["total"]).to eq(expected_total)
        expect(response_json["meta"]["pages"]).to eq(2)
      end
    end
  end
end
