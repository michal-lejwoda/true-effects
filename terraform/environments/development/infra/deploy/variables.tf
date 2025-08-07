variable "prefix" {
  description = "Prefix for resources in aws"
  default     = "te"
}
variable "project" {
  description = "Project name for tagging resources"
  default     = "true-effects"
}

variable "ARM_SUBSCRIPTION_ID" {
  type = string
}
variable "ARM_CLIENT_ID" {
  type = string
}
variable "ARM_CLIENT_SECRET" {
  type = string
}
variable "ARM_TENANT_ID" {
  type = string
}

variable "TF_VAR_acr_proxy_image" {
  type = string
}

variable "TF_VAR_acr_app_image" {
  type = string
}
variable "secret_key" {
  type = string
}

variable "email_host_user" {
  type = string
}

variable "email_host_password" {
  type = string
}

variable "django_settings_module" {
  type = string
}

variable "url" {
  type = string
}

variable "auth_user_model" {
  type = string
}
variable "db_url" {}