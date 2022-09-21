resource "aws_security_group" "postgresql_access" {
  vpc_id      = var.vpc.id
  description = "SG allowing access to the Postgres SG"

  tags = merge(
    {
      Name = "EC2 SG to access RDS - ${var.environment}"
    },
    var.tags
  )
}

resource "aws_security_group_rule" "port_forward_postgres" {
  type                     = "egress"
  from_port                = module.postgresql.port
  to_port                  = module.postgresql.port
  protocol                 = "-1"
  source_security_group_id = module.postgresql.security_group_id
  security_group_id        = aws_security_group.postgresql_access.id
}

resource "aws_security_group" "redis_access" {
  vpc_id      = var.vpc.id
  description = "SG allowing access to the Redis SG"

  tags = merge(
    {
      Name = "EC2 SG to access Redis - ${var.environment}"
    },
    var.tags
  )
}

resource "aws_security_group_rule" "port_forward_redis" {
  type                     = "egress"
  from_port                = module.redis.port
  to_port                  = module.redis.port
  protocol                 = "-1"
  source_security_group_id = module.redis.security_group_id
  security_group_id        = aws_security_group.redis_access.id
}

module "postgresql" {
  source = "../postgresql"

  log_retention_period        = var.rds_log_retention_period
  subnet_ids                  = var.subnet_ids
  project                     = var.project_name
  environment                 = var.environment
  rds_backup_retention_period = var.rds_backup_retention_period
  rds_user_name               = "postgres"
  rds_engine_version          = var.rds_engine_version
  rds_instance_class          = var.rds_instance_class
  rds_instance_count          = var.rds_instance_count
  tags                        = var.tags
  vpc_id                      = var.vpc.id
  rds_port                    = 5432
  vpc_cidr_block              = var.vpc.cidr_block
  availability_zones          = var.availability_zones
  database_name               = var.project_name
}

module "redis" {
  source = "../redis"

  redis_user_name = "sidekiq"
  project         = var.project_name
  environment     = var.environment
  tags            = var.tags
  vpc_id          = var.vpc.id
  vpc_cidr_block  = var.vpc.cidr_block
}

module "server" {
  source                    = "../server"
  project                   = var.project_name
  environment               = var.environment
  region                    = var.aws_region
  tags                      = var.tags
  vpc                       = var.vpc
  user_data                 = var.ec2_user_data
  site_server_ami           = var.ec2_ami
  availability_zone         = var.availability_zones[0]
  security_group_ids        = [aws_security_group.postgresql_access.id, aws_security_group.redis_access.id]
  site_server_instance_type = var.ec2_instance_type
}

