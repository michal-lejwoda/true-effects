output "check_db_password" {
  value     = var.db_password
  sensitive = false
}

output "key_vault_id" {
  value = azurerm_key_vault.te_key_vault_dev.id
}