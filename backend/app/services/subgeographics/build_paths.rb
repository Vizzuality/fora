module Subgeographics
  class BuildPaths
    attr_accessor :subgeographics, :ancestors

    def initialize(subgeographics, ancestors)
      @subgeographics = subgeographics
      @ancestors = ancestors
    end

    def call
      subgeographics.map do |subgeographic|
        build_path_for subgeographic
      end
    end

    private

    def build_path_for(subgeographic, result = [])
      return result if subgeographic.blank?

      result << subgeographic
      build_path_for grouped_ancestors[subgeographic.parent_id]&.first, result
    end

    def grouped_ancestors
      @grouped_ancestors ||= ancestors.group_by(&:id)
    end
  end
end
