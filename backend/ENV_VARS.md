For starters, we’ll need these:
RAILS_ENV (I prefer to separate staging / production, but maybe that’s just an old habit no longer needed)
RACK_ENV
RAILS_MAX_THREADS (say 10)
SECRET_KEY_BASE (generated with rake secret)

staging|production, NOT the same as RAILS_ENV as that is "production" in staging as well
INSTANCE_ROLE=

BACKEND_URL (without protocol)
RAILS_RELATIVE_URL_ROOT (if running backend application in sub url, like /backend)

DATABASE_NAME
DATABASE_USER
DATABASE_PASSWORD
DATABASE_HOST

REDIS_URL
REDIS_PASSWORD
