terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.31"
    }
    template = {
      source = "hashicorp/template"
    }
  }
  required_version = "1.2.9"
}

provider "aws" {
  region              = var.aws_region
  allowed_account_ids = [var.allowed_account_id]
}
