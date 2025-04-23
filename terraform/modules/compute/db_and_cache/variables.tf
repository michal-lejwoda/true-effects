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
  description = "This is id of container apps subnet"
}

variable "te_db_subnet_id" {
  type = string
  description = "This is id of db subnet"
}

variable "te_cache_subnet_id" {
  type = string
  description = "This is of subnet for redis "
}

variable "te_private_dns_zone_db_id" {
  type = string
  description = "this is private dns for db"
}

variable "backend_container_name" {
  type= string
  description = "This defines name of backend container"
}

variable "frontend_container_name" {
  type= string
  description = "This defines name of frontend container"
}