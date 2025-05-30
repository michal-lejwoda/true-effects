variable "resource_group_name" {
  type= string
  description = "This defines the name of the resource group"
}

variable "location" {
  type= string
  description = "This defines the location of the resource group and the resources"
}

variable "db_password" {
  type        = string
  description = "Password for db"
  # sensitive   = true
}

variable "db_username" {
  type      = string
  description = "Username for db"
}

variable "db_name"{
  type = string
  description = "Name of db"
}

variable "db_port" {
  type = string
  description = "Port of db"
}

variable "db_admin_username" {
  type = string
  description = "Admin username"
}

variable "db_admin_password" {
  type = string
  description = "Admin password"
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

