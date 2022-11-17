module ApplicationHelper
  include Pagy::Frontend

  STATUS_TAG_CLASSES = {
    "new" => "text-grey-20 bg-grey-20/20",
    "processing" => "text-green-20 bg-green-20/20",
    "completed" => "text-green-0 bg-green-0/20",
    "failed" => "text-red-dark bg-red-dark/20",
    "crashed" => "text-red-dark bg-red-dark/20"
  }

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

  def status_tag(enum_klass, key)
    return if key.blank?

    content_tag(
      :span,
      t("enums.#{enum_klass}.#{key}.name", default: key).downcase,
      class: "text-sm px-2 py-1 rounded-full #{STATUS_TAG_CLASSES[key.to_s]}"
    )
  end

  def svg(filename, options = {})
    filepath = Rails.root.join("app", "assets", "images", "#{filename}.svg")

    if File.exist?(filepath)
      file = File.read(filepath)
      doc = Nokogiri::HTML::DocumentFragment.parse file
      svg = doc.at_css "svg"
      svg["class"] = options[:class] if options[:class].present?
    else
      doc = "<!-- SVG #{filename} not found -->"
    end

    raw doc
  end
end
