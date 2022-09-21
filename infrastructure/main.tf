# Require TF version to be same as or greater than 0.15.0
terraform {
  backend "s3" {
    region  = "us-east-1"
    key     = "core.tfstate"
    encrypt = true
  }
}

data "aws_vpc" "default_vpc" {
  default = true
}

data "aws_availability_zones" "available_azs" {
  state = "available"
}

data "aws_subnets" "subnet_ids" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default_vpc.id]
  }
}

module "bootstrap" {
  source               = "./modules/bootstrap"
  s3_bucket            = var.tf_state_bucket
  dynamo_db_table_name = var.dynamo_db_lock_table_name
  tags                 = local.tags
}

module "staging" {
  source = "./modules/env"

  project_name       = var.project_name
  environment        = "staging"
  vpc                = data.aws_vpc.default_vpc
  subnet_ids         = data.aws_subnets.subnet_ids.ids
  availability_zones = data.aws_availability_zones.available_azs.names
  ec2_instance_type  = "t3a.medium"
  ec2_ami            = data.aws_ami.latest-ubuntu-lts.id
  ec2_user_data      = data.template_file.server_setup.rendered
  rds_engine_version = var.rds_engine_version
  rds_instance_class = "db.t3.micro"
}
