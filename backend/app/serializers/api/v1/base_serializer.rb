module API
  module V1
    class BaseSerializer
      include JSONAPI::Serializer

      class << self
        def belongs_to_restricted(relationship_name, options = {})
          belongs_to relationship_name, options do |object, params|
            result = object.public_send relationship_name
            params[:current_ability].can?(:show, result) ? result : nil
          end
        end

        def has_many_restricted(relationship_name, options = {})
          has_many relationship_name, options do |object, params|
            result = object.public_send relationship_name
            if result.loaded?
              # use already preloaded data and do final ability check at memory
              result.to_a.select { |r| params[:current_ability].can? :index, r }
            else
              result.accessible_by params[:current_ability]
            end
          end
        end
      end
    end
  end
end
