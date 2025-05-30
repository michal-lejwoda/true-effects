variable "resource_group_name" {
  type= string
  description = "This defines the name of the resource group"
}

variable "location" {
  type= string
  description = "This defines the location of the resource group and the resources"
}

variable "backend_container_name" {
  type= string
  description = "This defines name of backend container"
}

variable "frontend_container_name" {
  type= string
  description = "This defines name of frontend container"
}

variable "te-container-app-env" {
  type= string
}

variable "te_redis_name" {
  type= string
}

variable "te_postgres_name" {
  type = string
}

variable "te_container_app_env_name" {
  type = string
}

variable "te_vnet_name" {
  type= string
}

variable "te_container_apps_subnet_name" {
  type= string
}

variable "te_db_subnet_name" {
  type= string
}

variable "te_cache_subnet_name" {
  type= string
}

variable "db_link_name" {
  type= string
}

variable "db_password" {
  type = string
}

variable "db_name" {
  type = string
}

variable "db_port" {
  type = string
}

variable "db_username" {
  type = string
}

variable "db_admin_username" {
  type = string
}

variable "db_admin_password" {
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