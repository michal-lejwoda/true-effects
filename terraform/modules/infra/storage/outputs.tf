output "storage_account_name" {
  value = azurerm_storage_account.frontend.name
}

output "BLOB_URL" {
  value = azurerm_storage_blob.react_zip.url
}