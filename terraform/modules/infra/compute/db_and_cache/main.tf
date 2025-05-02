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
  administrator_login    = data.azurerm_key_vault_secret.db_admin_username.value
  administrator_password = data.azurerm_key_vault_secret.db_admin_password.value
  sku_name               = "B_Standard_B1ms"

  storage_mb             = 32768
  backup_retention_days  = 7

  delegated_subnet_id    = var.te_db_subnet_id
  private_dns_zone_id    = var.te_private_dns_zone_db_id
  public_network_access_enabled = false
  zone                   = "1"
}

resource "null_resource" "init_postgres" {
  provisioner "local-exec" {
    command = <<-EOT
      # Create database if not exists
      az postgres flexible-server execute \
        --name "${var.te_postgres_name}" \
        --admin-user "${data.azurerm_key_vault_secret.db_admin_username.value}" \
        --admin-password "${data.azurerm_key_vault_secret.db_admin_password.value}" \
        --database-name "${data.azurerm_key_vault_secret.db_name.value}" \
        --query "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '${data.azurerm_key_vault_secret.db_name.value}') THEN CREATE DATABASE ${data.azurerm_key_vault_secret.db_name.value}; END IF; END \$\$;"

      # Create user if not exists
      az postgres flexible-server execute \
        --name "${var.te_postgres_name}" \
        --admin-user "${data.azurerm_key_vault_secret.db_admin_username.value}" \
        --admin-password "${data.azurerm_key_vault_secret.db_admin_password.value}" \
        --database-name "${data.azurerm_key_vault_secret.db_name.value}" \
        --query "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${data.azurerm_key_vault_secret.db_username.value}') THEN CREATE ROLE ${data.azurerm_key_vault_secret.db_username.value} WITH LOGIN PASSWORD '${data.azurerm_key_vault_secret.db_password.value}'; END IF; END \$\$;"

      # Grant privileges
      az postgres flexible-server execute \
        --name "${var.te_postgres_name}" \
        --admin-user "${data.azurerm_key_vault_secret.db_admin_username.value}" \
        --admin-password "${data.azurerm_key_vault_secret.db_admin_password.value}" \
        --database-name "${data.azurerm_key_vault_secret.db_name.value}" \
        --query "GRANT ALL PRIVILEGES ON DATABASE ${data.azurerm_key_vault_secret.db_name.value} TO ${data.azurerm_key_vault_secret.db_username.value};"
    EOT
    interpreter = ["bash", "-c"]
  }

  triggers = {
    always_run = timestamp()
  }

  depends_on = [azurerm_postgresql_flexible_server.db]
}