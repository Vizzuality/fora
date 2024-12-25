module Backoffice
  class BaseController < ApplicationController
    include Pagy::Backend

    layout "backoffice"

    before_action :authenticate_admin!

    def current_ability
      @current_ability ||= Ability.new(current_admin)
    end

    def pagy_defaults
      {items: 10}
    end
  end
end
