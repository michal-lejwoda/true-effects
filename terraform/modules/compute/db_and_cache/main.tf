resource "azurerm_redis_cache" "redis" {
  name                = "te-redis"
  location            = var.location
  resource_group_name = var.resource_group_name
  capacity            = 1
  family              = "C"
  sku_name            = "Basic"
  enable_non_ssl_port = false

  redis_configuration {
    maxmemory_policy = "allkeys-lru"
  }

  subnet_id = azurerm_subnet.te_db_subnet.id
  minimum_tls_version = "1.2"
}

resource "azurerm_postgresql_flexible_server" "db" {
  name                   = "te-postgres"
  resource_group_name    = var.resource_group_name
  location               = var.location
  version                = "14"
  administrator_login    = "pgadmin"
  administrator_password = "SuperSecret123!"
  sku_name               = "GP_Standard_D2s_v3"

  storage_mb             = 32768
  backup_retention_days  = 7

  delegated_subnet_id    = azurerm_subnet.te_db_subnet.id
  private_dns_zone_id    = azurerm_private_dns_zone.db.id
  zone                   = "1"
}