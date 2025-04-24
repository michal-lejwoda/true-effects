resource "azurerm_resource_group" "te_grp" {
  name     = var.resource_group_name
  location = var.location
}