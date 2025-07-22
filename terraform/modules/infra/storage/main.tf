resource "azurerm_storage_account" "frontend" {
  name                     = "tefrontendstorage"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_account_static_website" "frontend_website" {
  storage_account_id = azurerm_storage_account.frontend.id
  index_document     = "index.html"
  error_404_document = "404.html"
}

# resource "azurerm_storage_container" "frontend_container" {
#   name                  = "frontend"
#   storage_account_id = azurerm_storage_account.frontend.id
#   container_access_type = "blob"
# }

# resource "azurerm_storage_blob" "react_zip" {
#   name                   = "build.zip"
#   storage_account_name   = azurerm_storage_account.frontend.name
#   storage_container_name = azurerm_storage_container.frontend_container.name
#   type                   = "Block"
#   source                 = "${path.module}/../../../trueeffectsfrontend/build.zip"
# }