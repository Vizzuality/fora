require "rails_helper"

RSpec.describe API::EnumFilter do
  subject do
    described_class.new query, filters, extra_belongs_to_models: extra_belongs_to_models, extra_has_many_models: extra_has_many_models
  end

  let(:extra_belongs_to_models) { [] }
  let(:extra_has_many_models) { [] }

  describe "#call" do
    context "when using multiple filters on string attributes" do
      let!(:correct_funder) do
        create :funder, funder_type: "accelerator", funder_legal_status: "for_profit"
      end
      let!(:different_funder_type_funder) do
        create :funder, funder_type: "advisory", funder_legal_status: "for_profit"
      end
      let!(:different_funder_legal_status_funder) do
        create :funder, funder_type: "accelerator", funder_legal_status: "government_organization"
      end
      let(:query) { Funder.all }
      let(:filters) { {funder_types: "accelerator", funder_legal_statuses: "for_profit"} }

      it "returns correct funder" do
        expect(subject.call).to eq([correct_funder])
      end
    end

    context "when using multiple filters on array attributes" do
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

    context "when filtering on enum attributes from different table through belong_to relation" do
      let!(:correct_project) do
        create :project, recipient: create(:recipient, recipient_legal_status: "government_organization")
      end
      let!(:different_recipient_legal_statuses_project) do
        create :project, recipient: create(:recipient, recipient_legal_status: "for_profit")
      end

      let(:query) { Project.joins(:recipient) }
      let(:filters) { {recipient_legal_statuses: "government_organization"} }
      let(:extra_belongs_to_models) { [Recipient] }

      it "returns correct project" do
        expect(subject.call).to eq([correct_project])
      end
    end

    context "when filtering on enum attributes from different table through has_many relation" do
      let!(:investment_1) { create :investment, project: correct_project, demographics: ["women"] }
      let!(:investment_2) { create :investment, project: correct_project, demographics: ["youth"] }
      let!(:investment_3) { create :investment, project: different_demographics_project, demographics: ["asian"] }
      let!(:correct_project) { create :project }
      let!(:different_demographics_project) { create :project }

      let(:query) { Project.all }
      let(:filters) { {demographics: "women,youth"} }
      let(:extra_has_many_models) { {Investment.all => "project_id"} }

      it "returns correct project" do
        expect(subject.call).to eq([correct_project])
      end
    end
  end
end
