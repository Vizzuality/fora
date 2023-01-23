module Frontend
  class RevalidateStaticPagesJob < ApplicationJob
    def perform(paths: :all, **params)
      Frontend::RevalidateStaticPages.new(paths: paths, **params).call
    end
  end
end
