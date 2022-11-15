variable "vpc" {
}

variable "project_name" {
  default     = "fora"
  type        = string
  description = "A project namespace for the infrastructure."
}

variable "environment" {
  type        = string
  description = "The name of the environment"
}

variable "aws_region" {
  default     = "us-east-1"
  type        = string
  description = "A valid AWS region to configure the underlying AWS SDK."
}

variable "tags" {
  default     = {}
  description = "Additional tags to add to resources"
}

variable "subnet_ids" {
}

variable "availability_zones" {
  type = list(string)
}

variable "ec2_user_data" {
  type = string
}

variable "ec2_ami" {
  type = string
}

variable "ec2_instance_type" {
  type        = string
  description = "EC2 instance type for the server"
}

variable "rds_backup_retention_period" {
  type        = number
  description = "Number of days to retain backup for the database"
  default     = 7
}

variable "rds_log_retention_period" {
  type        = number
  description = "Number of days to retain logs in Cloud Watch"
  default     = 30
}

variable "rds_engine_version" {
  type        = string
  description = "RDS Database engine version"
}

variable "rds_instance_count" {
  type        = number
  description = "Number of permanent RDS instances"
  default     = 1
}

variable "rds_instance_class" {
  type        = string
  description = "RDS instance type class"
}

variable "ses_domain_identity_arn" {
  type        = string
  description = "AWS SES domain identity ARN"
}
