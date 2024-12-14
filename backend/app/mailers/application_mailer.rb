class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAILER_DEFAULT_FROM", "noreply@fora.com")
  layout "mailer"
end
