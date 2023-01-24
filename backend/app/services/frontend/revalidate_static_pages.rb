module Frontend
  class RevalidateStaticPages
    attr_accessor :paths, :params

    PATHS = {
      all: %w[/api/revalidate/funders /api/revalidate/projects],
      funders: "/api/revalidate/funders",
      projects: "/api/revalidate/projects"
    }.freeze

    def initialize(paths: :all, **params)
      @paths = Array.wrap(PATHS[paths].presence || PATHS[:all])
      @params = params
    end

    def call
      uris.map { |uri| send_request_to uri }
    end

    private

    def send_request_to(uri)
      uri.query = URI.encode_www_form params.merge(secret: ENV["FRONTEND_API_SECRET"])
      Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
        http.request Net::HTTP::Get.new(uri, headers)
      end
    end

    def headers
      @headers ||= {"Content-Type" => "application/json", "Accept" => "application/json"}
    end

    def uris
      @uris ||= paths.map { |path| URI "#{ENV["FRONTEND_URL"]}#{path}" }
    end
  end
end
