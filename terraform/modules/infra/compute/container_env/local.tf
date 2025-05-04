locals {
  db_url = "postgres://${data.azurerm_key_vault_secret.db_admin_username.value}:${data.azurerm_key_vault_secret.db_admin_password.value}@${var.db_fqdn}:${data.azurerm_key_vault_secret.db_port.value}/${data.azurerm_key_vault_secret.db_name.value}"
  redis_url = "rediss://${var.redis_primary_key}@${var.redis_hostname}:6380/0"
}

