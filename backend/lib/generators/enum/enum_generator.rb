class EnumGenerator < Rails::Generators::NamedBase
  source_root File.expand_path("templates", __dir__)

  check_class_collision

  def create_enum
    template "enum.rb", File.join("app/models", "#{file_name}.rb")
    template "enum_controller.rb", File.join("app/controllers/api/v1", "#{file_name.pluralize}_controller.rb")
    template "enum_serializer.rb", File.join("app/serializers/api/v1/enums", "#{file_name}_serializer.rb")
    template "enum_spec.rb", File.join("spec/requests/api/v1", "#{file_name.pluralize}_spec.rb")
    modify_api_routes
    modify_cancancan_abilities
  end

  private

  def modify_api_routes
    inject_into_file "config/routes/api.rb", after: "# enums\n" do
      "    resources :#{file_name.pluralize}, only: %i[index]\n"
    end
  end

  def modify_cancancan_abilities
    inject_into_file "app/models/ability.rb", after: "# enums\n" do
      "    can %i[index show], #{class_name}\n"
    end
  end
end
