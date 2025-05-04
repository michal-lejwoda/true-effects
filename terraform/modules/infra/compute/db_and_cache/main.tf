data "azurerm_key_vault_secret" "db_admin_username" {
  name         = "db-admin-username"
  key_vault_id = var.key_vault_id
}

data "azurerm_key_vault_secret" "db_admin_password" {
  name         = "db-admin-password"
  key_vault_id = var.key_vault_id
}

data "azurerm_key_vault_secret" "db_name" {
  name         = "db-name"
  key_vault_id = var.key_vault_id
}

data "azurerm_key_vault_secret" "db_username" {
  name         = "db-username"
  key_vault_id = var.key_vault_id
}

data "azurerm_key_vault_secret" "db_password" {
  name         = "db-password"
  key_vault_id = var.key_vault_id
}



resource "azurerm_redis_cache" "redis" {
  name                = var.te_redis_name
  location            = var.location
  resource_group_name = var.resource_group_name
  capacity            = 1
  family              = "P"
  sku_name            = "Premium"
  #TODO Uncomment when move to azure
  public_network_access_enabled = true
  # enable_non_ssl_port = false
  redis_configuration {
    maxmemory_policy = "allkeys-lru"
  }

  # subnet_id = var.te_cache_subnet_id
  minimum_tls_version = "1.2"
}

resource "azurerm_postgresql_flexible_server" "db" {
  name                   = var.te_postgres_name
  resource_group_name    = var.resource_group_name
  location               = var.location
  version                = "14"
  administrator_login    = data.azurerm_key_vault_secret.db_admin_username.value
  administrator_password = data.azurerm_key_vault_secret.db_admin_password.value
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
  name                = data.azurerm_key_vault_secret.db_name.value
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