resource "azurerm_postgresql_flexible_server" "db" {
  name                   = "true-effects-postgres-db-1"
  resource_group_name    = "true-effects-rgp"
  location               = "West Europe"
  version                = "16"
  administrator_login    = "importantuser"
  # administrator_login    = var.db_admin_username
  administrator_password = "importantpassword"
  # administrator_password = var.db_admin_password
  sku_name               = "GP_Standard_D2s_v3"
  storage_mb             = 32768
  backup_retention_days  = 7
  delegated_subnet_id    = azurerm_subnet.private_a.id
  private_dns_zone_id    = azurerm_private_dns_zone.db_dns_zone.id
  public_network_access_enabled = false
  # zone                   = "1"
}


resource "azurerm_private_endpoint" "db_endpoint_a" {
  name                = "db_endpoint"
  location            = "West Europe"
  resource_group_name = "true-effects-rgp"
  subnet_id           = azurerm_subnet.private_a.id

  private_service_connection {
    name                           = "db-privatesc"
    private_connection_resource_id = azurerm_postgresql_flexible_server.db.id
    is_manual_connection           = false
    subresource_names              = ["postgresqlServer"]
  }
}

resource "azurerm_private_endpoint" "db_endpoint_b" {
  name                = "db_endpoint_b"
  location            = "West Europe"
  resource_group_name = "true-effects-rgp"
  subnet_id           = azurerm_subnet.private_b.id

  private_service_connection {
    name                           = "db-privatesc-b"
    private_connection_resource_id = azurerm_postgresql_flexible_server.db.id
    is_manual_connection           = false
    subresource_names              = ["postgresqlServer"]
  }
}


resource "azurerm_private_dns_zone" "db_dns_zone" {
  name                = "privatelink.postgres.database.azure.com"
  resource_group_name = "true-effects-rgp"
}

resource "azurerm_private_dns_zone_virtual_network_link" "db_dns_zone_link" {
  name                  = "db-dns-zone-link"
  resource_group_name   = "true-effects-rgp"
  private_dns_zone_name = azurerm_private_dns_zone.db_dns_zone.name
  virtual_network_id    = azurerm_virtual_network.main.id
}

resource "azurerm_private_dns_a_record" "private_db_dns_a_record" {
  name                = "private_db_dns_a_record"
  zone_name           = azurerm_private_dns_zone.db_dns_zone.name
  resource_group_name = "true-effects-rgp"
  ttl                 = 300
  records             = [azurerm_private_endpoint.db_endpoint_a.private_service_connection[0].private_ip_address,
                         azurerm_private_endpoint.db_endpoint_b.private_service_connection[0].private_ip_address]
}


