require "rails_helper"

RSpec.describe API::EnumFilter do
  subject { described_class.new query, filters }

  describe "#call" do
    let!(:correct_funder) do
      create :funder, areas: %w[equity_and_justice food_sovereignty], demographics: %w[black_or_african_american]
    end
    let!(:different_areas_funder) do
      create :funder, areas: %w[climate_change], demographics: %w[black_or_african_american]
    end
    let!(:different_demographics_funder) do
      create :funder, areas: %w[food_sovereignty], demographics: %w[women]
    end
    let!(:ignored_funder) do
      create :funder, areas: %w[equity_and_justice food_sovereignty], demographics: %w[black_or_african_american]
    end

    let(:query) do
      Funder.where id: [correct_funder.id, different_areas_funder.id, different_demographics_funder.id]
    end
    let(:filters) { {areas: "food_sovereignty,equity_and_justice", demographic: "black_or_african_american"} }

    it "returns correct funder" do
      expect(subject.call).to eq([correct_funder])
    end
  end
end
