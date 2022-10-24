module ApplicationHelper
  include Pagy::Frontend

  FLASH_CLASSES = {
    notice: "alert-success",
    success: "alert-success",
    info: "alert-info",
    error: "alert-danger",
    alert: "alert-danger"
  }.freeze

  def flash_class_for(type)
    FLASH_CLASSES.fetch(type.to_sym, type.to_s)
  end

  def nav_link_to(text, path)
    is_active = current_page?(path)
    classnames = {
      "text-black hover:text-green-80": true,
      "font-bold": is_active
    }.reject { |_k, v| v == false }.keys

    link_to text, path, class: classnames
  end
end
