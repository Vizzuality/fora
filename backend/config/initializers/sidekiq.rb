Sidekiq.configure_server do |config|
  config.redis = if ENV["REDIS_PASSWORD"]
    {url: ENV["REDIS_URL"], password: ENV["REDIS_PASSWORD"]}
  else
    {url: ENV["REDIS_URL"]}
  end
end

Sidekiq.configure_client do |config|
  config.redis = if ENV["REDIS_PASSWORD"]
    {url: ENV["REDIS_URL"], password: ENV["REDIS_PASSWORD"]}
  else
    {url: ENV["REDIS_URL"]}
  end
end
