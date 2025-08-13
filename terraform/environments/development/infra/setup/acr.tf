#ACR Resources
# resource "azurerm_container_registry" "app" {
#   name                = "trueeffectsacrapp"
#   resource_group_name = data.azurerm_resource_group.true_effects_rgp.name
#   location            = "West Europe"
#   sku                 = "Standard"
#   admin_enabled       = false
# }
#
# resource "azurerm_container_registry" "proxy" {
#   name                = "trueeffectsacrproxy"
#   resource_group_name = data.azurerm_resource_group.true_effects_rgp.name
#   location            = "West Europe"
#   sku                 = "Standard"
#   admin_enabled       = false
# }


resource "azurerm_container_registry" "main" {
  name                = "trueeffectsacr"
  resource_group_name = data.azurerm_resource_group.true_effects_rgp.name
  location            = "West Europe"
  sku                 = "Standard"
  admin_enabled       = false
}