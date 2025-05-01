resource "azurerm_storage_account" "frontend" {
  name                     = "tefrontendstorage"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "frontend_container" {
  name                  = "$web"
  storage_account_id = azurerm_storage_account.frontend.id
  container_access_type = "blob"
}

resource "azurerm_storage_blob" "frontend_files" {
  for_each = fileset("${path.module}/../../../trueeffectsfrontend/build", "**")

  name                   = each.value
  storage_account_name   = azurerm_storage_account.frontend.name
  storage_container_name = azurerm_storage_container.frontend_container.name
  type                   = "Block"
  source                 = "${path.module}/../../../trueeffectsfrontend/build/${each.value}"
  content_type           = lookup(var.mime_types, each.value, "application/octet-stream")
}