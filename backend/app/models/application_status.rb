# This file was generated with rails g enum ApplicationStatus

class ApplicationStatus
  include EnumModel

  TYPES = %w[
    does_not_provide_funding
    invitation_only
    open_invitation
  ].freeze
end
