#connection with blob

terraform {
  backend "azurerm" {
    resource_group_name  = "true-effects-rgp"
    storage_account_name = "trueeffectstfstate"
    container_name       = "tfstate"
    key                  = "dev.terraform.tfstate"
  }
}



# resource "azurerm_resource_group" "true-effects-rgp" {
#   location = "West Europe"
#   name     = "true-effects-rgp"
# }
#
# resource "azurerm_storage_account" "true-effects-tf-state" {
#   account_replication_type = "LRS"
#   account_tier             = "Standard"
#   location                 = "West Europe"
#   name                     = "trueeffectstfstate"
#   resource_group_name      = azurerm_resource_group.true-effects-rgp.name
# }
#
# resource "azurerm_storage_container" "true-effects-container-tf-state" {
#   name                  = "trueeffectscontainertfstate"
#   storage_account_id    = azurerm_storage_account.true-effects-tf-state.id
#   container_access_type = "private"
# }

# resource "azurerm_cosmosdb_account" "true-effects-lock" {
#   location            = "West Europe"
#   name                = "trueffectslock"
#   offer_type          = "Standard"
#   resource_group_name = azurerm_resource_group.true-effects-rgp.name
#   consistency_policy {
#     consistency_level       = "Session"
#     max_interval_in_seconds = 5
#     max_staleness_prefix    = 100
#   }
#   geo_location {
#     location          = "West Europe"
#     failover_priority = 0
#   }
# }
