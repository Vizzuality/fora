module Importers
  module Uploads
    module Submodules
      module Subgeographics
        extend ActiveSupport::Concern

        NATIONAL_SUBGEOGRAPHIC = "No state focus, they work nationally"
        OUTSIDE_US_SUBGEOGRAPHIC = "No state focus, they don't work in the US"

        private

        def assign_subgeographics_to(record, attr)
          states = attr[column_name_for(:geographic_states)].to_a
          countries = attr[column_name_for(:geographic_countries_first_part)].to_a + attr[column_name_for(:geographic_countries_second_part)].to_a
          countries = remove_duplicity_usa_from? countries, states

          record.subgeographic_ids = []
          record.subgeographic_ids += subgeographics[:national].to_h.values if states.include? NATIONAL_SUBGEOGRAPHIC
          record.subgeographic_ids += subgeographics[:countries].to_h.values_at(*countries)
          record.subgeographic_ids += subgeographics[:states].to_h.values_at(*states)
        end

        def subgeographics
          @subgeographics ||= Subgeographic.select(:name, :geographic, :id).each_with_object({}) do |subgeographic, result|
            result[subgeographic.geographic.to_sym] ||= {}
            result[subgeographic.geographic.to_sym][subgeographic.name] = subgeographic.id
          end
        end

        def remove_duplicity_usa_from?(countries, states)
          if states.include?(NATIONAL_SUBGEOGRAPHIC) || (states - [NATIONAL_SUBGEOGRAPHIC, OUTSIDE_US_SUBGEOGRAPHIC]).size.positive?
            countries - ["United States"]
          else
            countries
          end
        end
      end
    end
  end
end
