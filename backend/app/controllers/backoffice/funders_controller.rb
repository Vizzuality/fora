module Backoffice
  class FundersController < BaseController
    include AsResource

    private

    def create_params
      params.require(:funder).permit(:name)
    end
  end
end
