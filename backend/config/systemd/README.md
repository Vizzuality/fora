To install sidekiq as a `systemd` system-wide service on Ubuntu:
- sidekiq.service goes into `/lib/systemd/system/sidekiq.service` - check the rvm path and the application directory
- `sudo systemctl enable sidekiq`

The service file is based on this [sidekiq template](https://raw.githubusercontent.com/mperham/sidekiq/main/examples/systemd/sidekiq.service).

The capistrano deploy script is configured to work with ubuntu user, who can restart system-wide services using sudo.
