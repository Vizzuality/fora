output "bucket_id" {
  value       = aws_s3_bucket.bucket.id
  description = "S3 bucket id"
}

output "bucket_name" {
  value       = aws_s3_bucket.bucket.bucket
  description = "S3 bucket name"
}
