data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "te_key_vault_dev" {
  name                = "te-key-vault-dev"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku_name            = "standard"
  tenant_id           = data.azurerm_client_config.current.tenant_id

  soft_delete_retention_days = 7
  purge_protection_enabled   = false

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get",
      "Set",
      "List",
      "Delete"
    ]
  }
}

resource "azurerm_key_vault_secret" "db_password" {
  name         = "db-password"
  value        = var.db_password
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}

resource "azurerm_key_vault_secret" "db_username" {
  name         = "db-username"
  value        = var.db_username
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}

resource "azurerm_key_vault_secret" "db_name" {
  name         = "db-name"
  value        = var.db_name
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}

resource "azurerm_key_vault_secret" "db_port" {
  name         = "db-port"
  value        = var.db_port
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}

resource "azurerm_key_vault_secret" "db_admin_username" {
  name         = "db-admin-username"
  # value         = "hardoced value"
  value        = var.db_admin_username
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}

resource "azurerm_key_vault_secret" "db_admin_password" {
  name         = "db-admin-password"
  # value = "sadasdasddsa"
  value        = var.db_admin_password
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}
#-----
resource "azurerm_key_vault_secret" "secret_key" {
  name         = "secret-key"
  value        = var.secret_key
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}
resource "azurerm_key_vault_secret" "email_host_user" {
  name         = "email-host-user"
  value        = var.email_host_user
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}

resource "azurerm_key_vault_secret" "email_host_password" {
  name         = "email-host-password"
  value        = var.email_host_password
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}

resource "azurerm_key_vault_secret" "django_settings_module" {
  name         = "django-settings-module"
  value        = var.django_settings_module
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}
resource "azurerm_key_vault_secret" "url" {
  name         = "url"
  value        = var.url
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}
resource "azurerm_key_vault_secret" "auth_user_model" {
  name         = "auth-user-model"
  value        = var.auth_user_model
  key_vault_id = azurerm_key_vault.te_key_vault_dev.id
}