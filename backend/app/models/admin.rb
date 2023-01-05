class Admin < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable

  has_many :uploads, foreign_key: :created_by_id, dependent: :destroy

  validates :password, length: {minimum: 12, message: :password_length}, allow_nil: true
  validate :password_complexity
  validates_presence_of :first_name, :last_name

  ransacker :full_name do
    Arel.sql("CONCAT_WS(' ', admins.first_name, admins.last_name)")
  end

  def full_name
    "#{first_name} #{last_name}"
  end
  alias_method :to_s, :full_name

  private

  def password_complexity
    return if password.blank?
    return if password.match?(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./)

    errors.add :password, :password_complexity
  end

  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end
end
