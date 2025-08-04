#
# data "azuread_domains" "true-effects-domain" {
#   only_initial = true
# }
data "azurerm_resource_group" "true_effects_rgp" {
  name = "true-effects-rgp"
}

data "azurerm_storage_account" "true_effects_tf_state" {
  name                = "trueeffectstfstate"
  resource_group_name = data.azurerm_resource_group.true_effects_rgp.name
}


data "azurerm_storage_container" "true_effects_container_tf_state" {
  name                 = "tfstate"
  storage_account_name = data.azurerm_storage_account.true_effects_tf_state.name
}


resource "azuread_application_registration" "true-effects-cd-registration" {
  display_name = "true-effects-cd"
}

resource "azuread_service_principal" "true-effects-cd" {
  client_id = azuread_application_registration.true-effects-cd-registration.client_id
}


resource "azuread_application_password" "true-effects-cd-secret" {
  application_id = azuread_application_registration.true-effects-cd-registration.id
  display_name   = "true-effects-cd-secret"
}


resource "azurerm_role_assignment" "blob_data_contributor" {
  scope                = data.azurerm_storage_account.true_effects_tf_state.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = azuread_service_principal.true-effects-cd.object_id # object_id because i need only GUID not URL
}

resource "azurerm_role_assignment" "acr_push_app_role" {
  scope                = azurerm_container_registry.app.id
  role_definition_name = "AcrPush"
  principal_id         = azuread_service_principal.true-effects-cd.object_id
}

resource "azurerm_role_assignment" "acr_push_proxy_role" {
  scope                = azurerm_container_registry.proxy.id
  role_definition_name = "AcrPush"
  principal_id         = azuread_service_principal.true-effects-cd.object_id
}

