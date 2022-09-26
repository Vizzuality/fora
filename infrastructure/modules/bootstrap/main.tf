##
# Module to build the Terraform "bootstrap" configuration
##

# Build an S3 bucket to store TF state
module "s3" {
  source         = "../s3"
  s3_bucket_name = var.s3_bucket
  tags           = var.tags
}

# Build a DynamoDB to use for terraform state locking
resource "aws_dynamodb_table" "tf_lock_state" {
  name = var.dynamo_db_table_name

  # Pay per request is cheaper for low-i/o applications, like our TF lock state
  billing_mode = "PAY_PER_REQUEST"

  # Hash key is required, and must be an attribute
  hash_key = "LockID"

  # Attribute LockID is required for TF to use this table for lock state
  attribute {
    name = "LockID"
    type = "S"
  }

  tags = merge({
    Name     = var.dynamo_db_table_name
    Resource = "Terraform State"
  },
    var.tags)
}
