
resource "azurerm_virtual_network" "te_vnet" {
  name                = var.te_vnet_name
  address_space       = ["10.0.0.0/16"]
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_subnet" "te_container_apps_subnet" {
  name                 = var.te_container_apps_subnet_name
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.te_vnet.name
  address_prefixes     = ["10.0.0.0/23"]
}

resource "azurerm_subnet" "te_db_subnet" {
  name                 = var.te_db_subnet_name
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.te_vnet.name
  address_prefixes     = ["10.0.2.0/24"]
  #TODO UNCOMMENT LATER
  delegation {
    name = "delegation"

    service_delegation {
      name = "Microsoft.DBforPostgreSQL/flexibleServers"
      actions = [
        "Microsoft.Network/virtualNetworks/subnets/action"
      ]
    }
  }

}

resource "azurerm_subnet" "te_cache_subnet" {
  name                 = var.te_cache_subnet_name
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.te_vnet.name
  address_prefixes     = ["10.0.3.0/24"]

}

resource "azurerm_private_dns_zone" "db" {
  name                = "privatelink.postgres.database.azure.com"
  resource_group_name = var.resource_group_name
}

resource "azurerm_private_dns_zone_virtual_network_link" "db_link" {
  name                  = var.db_link_name
  resource_group_name   = var.resource_group_name
  private_dns_zone_name = azurerm_private_dns_zone.db.name
  virtual_network_id    = azurerm_virtual_network.te_vnet.id
  registration_enabled  = false
}