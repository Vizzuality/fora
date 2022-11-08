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
    can %i[index show], WidgetSlug
    can %i[index show], WidgetType
    can %i[index show], ReportYear
    can %i[index show], ReportPage
    can %i[index show], FundingType
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

    can %i[index show geojson], Subgeographic
    can %i[index show], SubgeographicGeometry
    can %i[index show], Funder
    can %i[index show], FunderSubgeographic
    can %i[index show], Project
    can %i[index show], Recipient
    can %i[index show], RecipientSubgeographic
    can %i[index show], Investment, visible: true
    can %i[index show], Widget
  end
end
