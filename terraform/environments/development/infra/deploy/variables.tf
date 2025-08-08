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

variable "acr_proxy_image" {
  type = string
}

variable "acr_app_image" {
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
variable "db_url" {
  type = string
}

variable "db_admin_username" {
  type    = string
  default = "importantuser"
}

variable "db_admin_password" {
  type    = string
  default = "importantpassword"
}

variable "db_fqdn" {
  type = string
}

variable "db_port" {
  type = string
}

variable "db_name" {
  type = string
}

variable "redis_primary_key" {
  type = string
}

variable "redis_hostname" {
  type = string
}

