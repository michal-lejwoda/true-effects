locals {
  db_url = "postgres://${data.azurerm_key_vault_secret.db_username.value}:${data.azurerm_key_vault_secret.db_password.value}@${var.db_fqdn}:${data.azurerm_key_vault_secret.db_port.value}/${data.azurerm_key_vault_secret.db_name.value}"
}
