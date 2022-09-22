Rails.application.routes.draw do
  get :health_check, to: ->(_env) { [204, {}, [""]] }

  draw :backoffice
  draw :api
end
