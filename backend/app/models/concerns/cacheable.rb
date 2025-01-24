module Cacheable
  extend ActiveSupport::Concern

  included do
    after_commit :flush_cache
  end

  def flush_cache
    Frontend::RevalidateStaticPagesJob.perform_later paths: :all
    Rails.cache.clear
  end
end
