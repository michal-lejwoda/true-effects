variable "resource_group_name" {
  type= string
  description = "This defines the name of the resource group"
}

variable "location" {
  type= string
  description = "This defines the location of the resource group and the resources"
}

variable "te_container_apps_subnet_id" {
  type = string
}

variable "backend_container_name" {
  type= string
  description = "This defines name of backend container"
}

variable "frontend_container_name" {
  type= string
  description = "This defines name of frontend container"
}

variable "te_container_app_env_name" {
  type = string
}

variable "key_vault_id" {
  description = "ID Key Vault"
  type        = string
}
variable "db_fqdn" {
  description = "FQDN of the database"
  type = string
}

variable "redis_hostname" {
  type = string
}

variable "redis_primary_key" {
  type = string
  sensitive = true
}
variable "storage_account_name" {
  type = string
}

variable "db_admin_username" {
  type = string
  sensitive = true

}

variable "db_admin_password" {
  type = string
  sensitive = true
}

variable "db_name" {
  type = string
  sensitive = true
}

variable "db_port"{
  type = string
  sensitive = true
}
variable "secret_key"{
  type = string
  sensitive = true
}

variable "email_host_user"{
  type = string
  sensitive = true
}

variable "email_host_password"{
  type = string
  sensitive = true
}
variable "django_settings_module"{
  type = string
  sensitive = true
}
variable "url"{
  type = string
  sensitive = true
}
variable "auth_user_model"{
  type = string
  sensitive = true
}



# variable "BLOB_URL" {
#   type = string
# }