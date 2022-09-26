# FORA backend

## Dependencies:

- Ruby v3.1.2
- Bundler v2.3.3
- PostgreSQL v14
- Sidekiq + Redis
- AppSignal

## Local installation

These are the steps to run the project locally:

### Installing ruby dependencies

On the project's root run `bundle install`.

### Database

#### Create database schema

`bin/rails db:setup` to setup the database

### Run the server

`bin/dev` and access the project on `http://localhost:4000`

If you want to debug rails app, running it through foreman could be not the best idea. In that case you can run css and js bundling
using foreman `bin/watch` and the server in the standard way in a separate terminal tab.

### Run background jobs

We use `sidekiq` gem to schedule ad-hoc background jobs. In development, you need `redis-server` running and a `sidekiq` process.

### Run the tests

`bundle exec rspec`

### Run rswag to generate API documentation

`SWAGGER_DRY_RUN=0 rake rswag:specs:swaggerize`

Documentation can be found at `/api-docs`.

### Replace snapshot files

On the first run, the `match_snapshot` matcher will always return success and it will store a snapshot file. On the next runs, it will compare the response with the file content.

If you need to replace snapshots, run the specs with:

`REPLACE_SNAPSHOTS=true bundle exec rspec`

If you only need to add, remove or replace data without replacing the whole snapshot:

`CONSERVATIVE_UPDATE_SNAPSHOTS=true bundle exec rspec`

### Run linters

`bin/rails standard`

To fix linter issues

`bin/rails standard:fix`

## ENV variables

| Variable name           | Description                                                                                 |                          Default value |
|-------------------------|---------------------------------------------------------------------------------------------|---------------------------------------:|
| RAILS_ENV               | Rails environment                                                                           |                            development |
| RAILS_MAX_THREADS       | Number of Puma threads                                                                      |                                      5 |
| SECRET_KEY_BASE         | secret to the application's key generator                                                   |                                        |
| INSTANCE_ROLE           | staging or production, NOT the same as RAILS_ENV as that is "production" in staging as well |                                        |
| BACKEND_URL             | Rails app url                                                                               | http://localhost:4000/sub-path/backend |
| RAILS_RELATIVE_URL_ROOT | if running backend application in sub url                                                   |                      /sub-path/backend |
| DATABASE_NAME           | db setup                                                                                    |                                   fora |
| DATABASE_USER           | db setup                                                                                    |                               postgres |
| DATABASE_PASSWORD       | db setup                                                                                    |                                        |
| DATABASE_HOST           | db setup                                                                                    |                              localhost |
| REDIS_URL               | url to redis used by sidekiq                                                                |                 redis://localhost:6379 |
| REDIS_PASSWORD          |                                                                                             |                                        |
| AWS_ACCESS_KEY_ID       | S3 storage                                                                                  |                                        |
| AWS_SECRET_ACCESS_KEY   | S3 storage                                                                                  |                                        |
| AWS_S3_BUCKET_NAME      | S3 storage                                                                                  |                                        |
| AWS_REGION              | S3 storage                                                                                  |                                        |
| APPSIGNAL_PUSH_API_KEY  | AppSignal API key                                                                           |                                        |
