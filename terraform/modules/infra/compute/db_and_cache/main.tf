# data "azurerm_key_vault_secret" "db_admin_username" {
#   name         = "db-admin-username"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "db_admin_password" {
#   name         = "db-admin-password"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "db_name" {
#   name         = "db-name"
#   key_vault_id = var.key_vault_id
# }




resource "azurerm_redis_cache" "redis" {
  name                = var.te_redis_name
  location            = var.location
  resource_group_name = var.resource_group_name
  capacity            = 0
  family              = "C"
  sku_name            = "Basic"
  #TODO Uncomment when move to azure
  public_network_access_enabled = true
  redis_configuration {
    maxmemory_policy = "allkeys-lru"
  }

  minimum_tls_version = "1.2"
}

resource "azurerm_postgresql_flexible_server" "db" {
  name                   = var.te_postgres_name
  resource_group_name    = var.resource_group_name
  location               = var.location
  version                = "16"
  administrator_login    = "importantuser"
  # administrator_login    = var.db_admin_username
  administrator_password = "importantpassword"
  # administrator_password = var.db_admin_password
  sku_name               = "B_Standard_B1ms"

  storage_mb             = 32768
  backup_retention_days  = 7

  #TODO UNCOMMENT
  # delegated_subnet_id = null
  # delegated_subnet_id    = var.te_db_subnet_id
  # private_dns_zone_id    = var.te_private_dns_zone_db_id
  public_network_access_enabled = true
  zone                   = "1"
}

resource "azurerm_postgresql_flexible_server_database" "te_db_dev" {
  name                = var.db_name
  server_id           = azurerm_postgresql_flexible_server.db.id
  charset             = "UTF8"
  collation           = "en_US.utf8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_local" {
  name             = "AllowLocalIP"
  server_id        = azurerm_postgresql_flexible_server.db.id
  start_ip_address = "37.225.76.195"
  end_ip_address   = "37.225.76.195"
}