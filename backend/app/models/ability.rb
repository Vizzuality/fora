class Ability
  include CanCan::Ability

  attr_accessor :user

  def initialize(member_or_admin)
    if member_or_admin.is_a?(Admin)
      @admin = member_or_admin
      admin_rights
    elsif member_or_admin.is_a?(Member)
      @member = member_or_admin
      member_rights
    end

    default_rights
  end

  private

  def admin_rights
    can :manage, :all

    unless @admin.is_super_admin?
      cannot %i[create update destroy], Admin
      cannot %i[destroy], Member
      cannot %i[destroy], Project
      cannot %i[destroy], Funder
      cannot %i[destroy], Investment
    end
    can %i[update], Admin, id: @admin.id
  end

  def member_rights
    can %i[show update], Member, id: @member.id
    can %i[show update], Funder, id: @member.funder_id
    can :manage, Project, member_id: @member.id
    can :manage, Recipient, project: {member_id: @member.id}
    can :manage, Investment, funder: {id: @member.funder_id}
  end

  def default_rights
    # enums
    can %i[index show], WidgetSlug
    can %i[index show], WidgetType
    can %i[index show], ReportYear
    can %i[index show], ReportPage
    can %i[index show], FundingType
    can %i[index show], GrantDuration
    can %i[index show], ApplicationStatus
    can %i[index show], CapitalAcceptance
    can %i[index show], Demographic
    can %i[index show], CapitalType
    can %i[index show], RecipientLegalStatus
    can %i[index show], FunderLegalStatus
    can %i[index show], FunderType
    can %i[index show], Geographic
    can %i[index show], Area
    can %i[index show], InvestmentPrivacy

    can %i[index show geojson], Subgeographic
    can %i[index show], SubgeographicGeometry
    can %i[index show], Funder, published: true
    can %i[index show], FunderSubgeographic
    can %i[index show], Project
    can %i[index show], Recipient
    can %i[index show], InvestmentSubgeographic
    can %i[index show download], Widget
  end
end
