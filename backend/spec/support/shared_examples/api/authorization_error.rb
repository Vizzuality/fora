require "swagger_helper"

RSpec.shared_examples "with authorization" do
  response "403", "Forbidden", generate_swagger_example: true do
    let(:Authorization) { nil }

    schema "$ref" => "#/components/schemas/errors"

    run_test!
  end
end
