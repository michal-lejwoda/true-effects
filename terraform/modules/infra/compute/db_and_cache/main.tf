resource "azurerm_redis_cache" "redis" {
  name                = var.te_redis_name
  location            = var.location
  resource_group_name = var.resource_group_name
  capacity            = 1
  family              = "P"
  sku_name            = "Premium"
  # enable_non_ssl_port = false

  redis_configuration {
    maxmemory_policy = "allkeys-lru"
  }

  subnet_id = var.te_cache_subnet_id
  minimum_tls_version = "1.2"
}

resource "azurerm_postgresql_flexible_server" "db" {
  name                   = var.te_postgres_name
  resource_group_name    = var.resource_group_name
  location               = var.location
  version                = "14"
  administrator_login    = "pgadmin"
  administrator_password = "SuperSecret123!"
  sku_name               = "GP_Standard_D2s_v3"

  storage_mb             = 32768
  backup_retention_days  = 7

  delegated_subnet_id    = var.te_db_subnet_id
  private_dns_zone_id    = var.te_private_dns_zone_db_id
  public_network_access_enabled = false
  zone                   = "1"
}