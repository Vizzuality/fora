# Fora

## Architecture

This project has 3 main folders:

- `backend`: Server side API
- `client`: Frontend HTML+CSS+JS code, plus a lightweight application server
- `infrastructure`: Terraform code to deploy the server infrastructure to AWS

Note that AWS is not a dependency, and both `backend` and `client` applications can be deployed on other cloud
providers.

## Deploying on AWS servers (staging + production)

Deploying both `client` and `backend` application to a server can be done using [Capistrano](https://capistranorb.com/),
which is already configured. There are preconfigured [Github Actions](https://github.com/features/actions) that will
automatically deploy both applications from key branches (`staging` and `main`) to their corresponding server
environments (`staging` and `production`).
