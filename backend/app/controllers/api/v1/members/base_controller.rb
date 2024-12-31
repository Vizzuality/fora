module API
  module V1
    module Members
      class BaseController < API::V1::BaseController
        before_action :authenticate!
      end
    end
  end
end
