# Output values which can be referenced in other repos
output "account_id" {
  value       = data.aws_caller_identity.current.account_id
  description = "ID of AWS account"
}

#output "prod_ec2_instance_ip" {
#  value = module.prod_server.ec2_instance_ip
#}
#
#output "staging_ec2_instance_ip" {
#  value = module.staging_server.ec2_instance_ip
#}

#output "redis_host" {
#  value = module.redis.host
#}
#
#output "redis_port" {
#  value = module.redis.port
#}

output "mx_record_name" {
  value = module.email.mx_record_name
}

output "mx_record_value" {
  value = module.email.mx_record_value
}

output "txt_record_name" {
  value = module.email.txt_record_name
}

output "txt_record_value" {
  value = module.email.txt_record_value
}

output "smtp_server_address" {
  value = module.email.smtp_server_address
}
