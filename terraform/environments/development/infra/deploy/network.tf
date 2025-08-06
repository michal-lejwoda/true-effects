resource "azurerm_virtual_network" "main" {
  name                = "main"
  address_space       = ["10.1.0.0/16"]
  location            = "West Europe"
  resource_group_name = "true-effects-rgp"
}

resource "azurerm_subnet" "public_a"{
  name                 = "public_a"
  resource_group_name  = "true-effects-rgp"
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes       = ["10.1.1.0/24"]
  # route_table_id       = azurerm_route_table.example.id
}

resource "azurerm_route_table" "public_a" {
  name                = "public-a-route-table"
  location            = "West Europe"
  resource_group_name = "true-effects-rgp"
}

resource "azurerm_route" "public_internet_access_a" {
  name                   = "public-internet-access-a-route"
  resource_group_name    = "true-effects-rgp"
  route_table_name       = azurerm_route_table.public_a.name
  address_prefix         = "0.0.0.0/0"
  next_hop_type          = "Internet"
}

resource "azurerm_subnet_route_table_association" "public_a" {
  subnet_id      = azurerm_subnet.public_a.id
  route_table_id = azurerm_route_table.public_a.id
}

resource "azurerm_subnet" "public_b"{
  name                 = "public_b"
  resource_group_name  = "true-effects-rgp"
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes       = ["10.1.2.0/24"]

}

resource "azurerm_route_table" "public_b" {
  name                = "public-b-route-table"
  location            = "West Europe"
  resource_group_name = "true-effects-rgp"
}

resource "azurerm_route" "public_internet_access_b" {
  name                   = "public-internet-access-a-route"
  resource_group_name    = "true-effects-rgp"
  route_table_name       = azurerm_route_table.public_b.name
  address_prefix         = "0.0.0.0/0"
  next_hop_type          = "Internet"
}

resource "azurerm_subnet_route_table_association" "public_b" {
  subnet_id      = azurerm_subnet.public_b.id
  route_table_id = azurerm_route_table.public_b.id
}

#Private subnet for internal access
resource "azurerm_subnet" "private_a" {
  name                 = "private_a"
  resource_group_name  = "true-effects-rgp"
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes       = ["10.1.10.0/24"]
}

resource "azurerm_subnet" "private_b" {
  name                 = "private_b"
  resource_group_name  = "true-effects-rgp"
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes       = ["10.1.11.0/24"]
}
#
# ##Enpoint to allow to Access ACR, CLoudwatch and System Manager
#
# resource "azurerm_network_security_group" "endpoint_access" {
#   location            = "West Europe"
#   name                = "endpoint_access"
#   resource_group_name = "true-effects-rgp"
# }
#
# resource "azurerm_network_security_rule" "allow_https_from_vnet" {
#   name                        = "allow_https_from_vnet"
#   priority                    = 100
#   direction                   = "Inbound"
#   access                      = "Allow"
#   protocol                    = "Tcp"
#   source_port_range           = "*"
#   destination_port_range      = "443"
#   source_address_prefix       = "10.1.0.0/16"
#   destination_address_prefix  = "*"
#   resource_group_name         = "true-effects-rgp"
#   network_security_group_name = azurerm_network_security_group.endpoint_access.name
# }
#TODO Uncomment later
# resource "azurerm_private_endpoint" "acr_a" {
#   name                = "acr-private-a-endpoint"
#   location            = "West Europe"
#   resource_group_name = "true-effects-rgp"
#   subnet_id           = azurerm_subnet.private_a.id
#
#   private_service_connection {
#     name                           = "acr-private-connection"
#     private_connection_resource_id = azurerm_container_registry.acr.id
#     subresource_names              = ["registry"]
#     is_manual_connection           = false
#   }
# }
#
# resource "azurerm_private_endpoint" "acr_b" {
#   name                = "acr-private-b-endpoint"
#   location            = "West Europe"
#   resource_group_name = "true-effects-rgp"
#   subnet_id           = azurerm_subnet.private_b.id
#
#   private_service_connection {
#     name                           = "acr-private-connection"
#     private_connection_resource_id = azurerm_container_registry.acr.id
#     subresource_names              = ["registry"]
#     is_manual_connection           = false
#   }
# }
#
# resource "azurerm_private_endpoint" "monitor_a" {
#   name                = "pe-monitor"
#   location            = "West Europe"
#   resource_group_name = "true-effects-rgp"
#   subnet_id           = azurerm_subnet.private_a.id
#
#   private_service_connection {
#     name                           = "monitor-connection"
#     private_connection_resource_id = azurerm_monitor_diagnostic_setting.diagnostics.id
#     subresource_names              = ["monitor"]
#     is_manual_connection           = false
#   }
# }
# resource "azurerm_private_endpoint" "monitor_b" {
#   name                = "pe-monitor"
#   location            = "West Europe"
#   resource_group_name = "true-effects-rgp"
#   subnet_id           = azurerm_subnet.private_b.id
#
#   private_service_connection {
#     name                           = "monitor-connection"
#     private_connection_resource_id = azurerm_monitor_diagnostic_setting.diagnostics.id
#     subresource_names              = ["monitor"]
#     is_manual_connection           = false
#   }
# }

#SSM endpoint
#blob