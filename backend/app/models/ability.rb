class Ability
  include CanCan::Ability

  attr_accessor :user

  def initialize(user)
    @user = user

    default_rights
  end

  private

  def default_rights
    # enums
    can %i[index show], GrantDuration
    can %i[index show], ApplicationStatus
    can %i[index show], Role
    can %i[index show], CapitalAcceptance
    can %i[index show], Demographic
    can %i[index show], CapitalType
    can %i[index show], RecipientLegalStatus
    can %i[index show], FunderLegalStatus
    can %i[index show], FunderType
    can %i[index show], Geographic
    can %i[index show], Area
  end
end
