module Importers
  module Uploads
    module Submodules
      module Logos
        extend ActiveSupport::Concern

        private

        def assign_logo_to(record, attr)
          tempfile = images["#{simple_column_for(:respondent_id, attr)}_#{simple_column_for(:logo, attr)}"]
          return if tempfile.blank?

          record.logo.attach io: tempfile,
            filename: CGI.unescape(simple_column_for(:logo, attr)),
            content_type: MIME::Types.type_for(tempfile.path)
        end
      end
    end
  end
end
