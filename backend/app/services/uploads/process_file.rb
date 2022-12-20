require "csv"
require "zip"

module Uploads
  class ProcessFile
    attr_accessor :upload, :errors

    FUNDER_CSV = "funders.csv"
    PROJECT_CSV = "projects.csv"
    FUNDER_IMAGES_FOLDER = "funder_images"
    PROJECT_IMAGES_FOLDER = "project_images"

    def initialize(upload)
      @upload = upload
      @errors = []
    end

    def call
      upload.transaction do
        Importers::Uploads::Funders.new(zip_data[:funders], zip_data[:funder_images], errors).call
        Importers::Uploads::Projects.new(zip_data[:projects], zip_data[:project_images], errors).call
        Importers::Uploads::Investments.new(zip_data[:projects], {}, errors).call
        raise ActiveRecord::Rollback if errors.present?
      end
    end

    private

    def zip_data
      @zip_data ||= begin
        result = {funders: nil, funder_images: {}, projects: nil, project_images: {}}
        Zip::File.open_buffer(upload.file.blob.download) do |zip|
          zip.each { |file| store file, to: result }
        end
        result
      end
    end

    def store(file, to:)
      return unless file.file?

      *path, basename = file.name.split "/"
      to[:funders] = transform_to_hash(file.get_input_stream.read) if basename == FUNDER_CSV
      to[:funder_images][basename] = to_tempfile(file, basename) if path.first == FUNDER_IMAGES_FOLDER
      to[:projects] = transform_to_hash(file.get_input_stream.read) if basename == PROJECT_CSV
      to[:project_images][basename] = to_tempfile(file, basename) if path.first == PROJECT_IMAGES_FOLDER
    end

    def to_tempfile(file, basename)
      tempfile = Tempfile.new [basename, File.extname(basename)], binmode: true
      tempfile.write file.get_input_stream.read
      tempfile.rewind
      tempfile
    end

    def transform_to_hash(csv_data)
      [].tap do |result|
        CSV.parse(csv_data, headers: true, encoding: "UTF-8").each.with_index do |row, i|
          next if i.zero? # skip first line because it contains just some surveymonkey metadata

          result[i - 1] = {}
          prev_key = nil
          row.each do |key, value|
            prev_key = key if key.present?
            result[i - 1][prev_key] = (result[i - 1][prev_key].presence || []) << value unless value.blank?
          end
        end
      end
    end
  end
end
