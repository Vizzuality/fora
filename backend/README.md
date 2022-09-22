# FORA backend

## Dependencies:

- Ruby v3.1.2
- Bundler v2.3.3
- PostgreSQL v14

## Local installation

These are the steps to run the project locally:

See ENV VARS documented in ENV_VARS.md

### Installing ruby dependencies

On the project's root run `bundle install`.

### Database

#### Create database schema

`bin/rails db:setup` to setup the database

### Run the server

`bin/dev` and access the project on `http://localhost:4000`

If you want to debug rails app, running it through foreman could be not the best idea. In that case you can run css and js bundling
using foreman `bin/watch` and the server in the standard way in a separate terminal tab.

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
