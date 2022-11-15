output "mx_record_name" {
  value = aws_ses_domain_mail_from.mail_from.mail_from_domain
}

output "mx_record_value" {
  value = "10 feedback-smtp.${var.region}.amazonses.com"
}

output "txt_record_name" {
  value = aws_ses_domain_mail_from.mail_from.mail_from_domain
}

output "txt_record_value" {
  value = "v=spf1 include:amazonses.com -all"
}

output "ses_domain_identity_arn" {
  value = aws_ses_domain_identity.domain_identity.arn
}
