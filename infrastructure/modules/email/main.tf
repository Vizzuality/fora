resource "aws_ses_domain_mail_from" "mail_from" {
  domain           = aws_ses_domain_identity.domain_identity.domain
  mail_from_domain = "no-reply.${aws_ses_domain_identity.domain_identity.domain}"
}

resource "aws_ses_domain_identity" "domain_identity" {
  domain = var.domain
}
