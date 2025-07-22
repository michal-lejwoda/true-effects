output "check_db_password" {
  value     = var.db_password
  sensitive = false
}

output "key_vault_id" {
  value = azurerm_key_vault.te_key_vault_dev.id
}

output "db_admin_username_value" {
  value = azurerm_key_vault_secret.db_admin_username.value
  sensitive = true
}

output "db_admin_password_value" {
  value = azurerm_key_vault_secret.db_admin_password.value
  sensitive = true
}

output "db_name_value" {
  value = azurerm_key_vault_secret.db_name.value
  sensitive = true
}

output "db_port_value"{
  value = azurerm_key_vault_secret.db_port.value
  sensitive = true
}
output "secret_key_value"{
  value = azurerm_key_vault_secret.secret_key.value
  sensitive = true
}

output "email_host_user_value"{
  value = azurerm_key_vault_secret.email_host_user.value
  sensitive = true
}

output "email_host_password_value"{
  value = azurerm_key_vault_secret.email_host_password.value
  sensitive = true
}
output "django_settings_module_value"{
  value = azurerm_key_vault_secret.django_settings_module.value
  sensitive = true
}
output "url_value"{
  value = azurerm_key_vault_secret.url.value
  sensitive = true
}

output "auth_user_model_value"{
  value = azurerm_key_vault_secret.auth_user_model.value
  sensitive = true
}

