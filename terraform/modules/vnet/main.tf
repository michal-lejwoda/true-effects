
resource "azurerm_virtual_network" "te_vnet" {
  name                = "te_vnet"
  address_space       = ["10.0.0.0/16"]
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_subnet" "te_container_apps_subnet" {
  name                 = "te_container_apps_subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.te_vnet.name
  address_prefixes     = ["10.0.0.0/23"]
}

resource "azurerm_subnet" "te_db_subnet" {
  name                 = "te_db_subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.te_vnet.name
  address_prefixes     = ["10.0.2.0/24"]

}