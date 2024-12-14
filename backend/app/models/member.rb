class Member < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable, :confirmable

  validates_presence_of :first_name, :last_name

  validates :password, length: { minimum: 12, message: :password_length }
  validate :password_complexity

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
