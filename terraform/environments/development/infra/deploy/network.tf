resource "azurerm_virtual_network" "main" {
  name                = "main"
  address_space       = ["10.1.0.0/16"]
  location            = "West Europe"
  resource_group_name = "true-effects-rgp"
}
