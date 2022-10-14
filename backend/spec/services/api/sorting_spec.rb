require "rails_helper"

RSpec.describe API::Sorting do
  subject { described_class.new query, sorting, columns }

  describe "#call" do
    let!(:funder_1) { create :funder, name: "BBBB", description: "BBBB" }
    let!(:funder_2) { create :funder, name: "AAAA", description: "AAAA" }
    let(:query) { Funder.all }
    let(:columns) { %i[name] }

    context "when attribute is not allowed for sorting" do
      let(:sorting) { {attribute: :description} }

      it "returns data for original query" do
        expect(subject.call.to_a).to eq([funder_1, funder_2])
      end
    end

    context "when sorting attribute is allowed" do
      let(:sorting) { {attribute: :name, direction: :asc} }

      it "returns sorted result" do
        expect(subject.call.to_a).to eq([funder_2, funder_1])
      end

      context "when changing sorting direction" do
        let(:sorting) { {attribute: :name, direction: :desc} }

        it "returns sorted result" do
          expect(subject.call.to_a).to eq([funder_1, funder_2])
        end
      end
    end
  end
end
