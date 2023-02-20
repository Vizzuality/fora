require "rails_helper"

RSpec.describe Frontend::RevalidateStaticPages do
  subject { described_class.new paths: paths, **params }

  describe ".call" do
    context "when single page is revalidated" do
      let(:paths) { :funders }
      let(:params) { {id: "FUNDER_ID"} }

      before do
        stub_request(:get, "#{ENV["FRONTEND_URL"]}/api/revalidate/funders?secret=#{ENV["FRONTEND_API_SECRET"]}&id=FUNDER_ID")
          .with(headers: {"Content-Type" => "application/json", "Accept" => "application/json"})
          .to_return(status: 200, body: {}.to_json, headers: {})
      end

      it "sends request to frontend" do
        expect(subject.call.map(&:code)).to eq(["200"])
      end
    end

    context "when all static pages are revalidated" do
      let(:paths) { :all }
      let(:params) { {} }

      before do
        stub_request(:get, "#{ENV["FRONTEND_URL"]}/api/revalidate/funders?secret=#{ENV["FRONTEND_API_SECRET"]}")
          .with(headers: {"Content-Type" => "application/json", "Accept" => "application/json"})
          .to_return(status: 200, body: {}.to_json, headers: {})
        stub_request(:get, "#{ENV["FRONTEND_URL"]}/api/revalidate/projects?secret=#{ENV["FRONTEND_API_SECRET"]}")
          .with(headers: {"Content-Type" => "application/json", "Accept" => "application/json"})
          .to_return(status: 200, body: {}.to_json, headers: {})
        stub_request(:get, "#{ENV["FRONTEND_URL"]}/api/revalidate/dashboards?secret=#{ENV["FRONTEND_API_SECRET"]}")
          .with(headers: {"Content-Type" => "application/json", "Accept" => "application/json"})
          .to_return(status: 200, body: {}.to_json, headers: {})
      end

      it "sends multiple requests to frontend" do
        expect(subject.call.map(&:code)).to eq(["200", "200", "200"])
      end
    end
  end
end
