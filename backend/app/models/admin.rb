class Admin < ApplicationRecord
  devise :database_authenticatable, :registerable, :rememberable, :validatable

  validates :password, length: {minimum: 12, message: :password_length}, allow_nil: true
  validate :password_complexity
  validates_presence_of :first_name, :last_name

  ransacker :full_name do
    Arel.sql("CONCAT_WS(' ', admins.first_name, admins.last_name)")
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def password_complexity
    return if password.blank?
    return if password.match?(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./)

    errors.add :password, :password_complexity
  end
end
