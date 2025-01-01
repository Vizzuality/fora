module Backoffice
  class InvestmentsController < BaseController
    include AsResource

    self.includes = [:funder, project: :recipient]
  end
end
