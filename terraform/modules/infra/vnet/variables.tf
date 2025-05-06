variable "resource_group_name" {
  type= string
  description = "This defines the name of the resource group"
}

variable "location" {
  type= string
  description = "This defines the location of the resource group and the resources"
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