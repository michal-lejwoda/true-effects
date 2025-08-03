output "storage_account_name" {
  value = azurerm_storage_account.frontend.name
}

output "frontend_static_website_url" {
  value = azurerm_storage_account.frontend.primary_web_endpoint
  description = "URL do statycznej strony frontend"
}


# output "BLOB_URL" {
#   value = azurerm_storage_blob.react_zip.url
# }

# output "frontend_build_path" {
#   value = "${path.module}/../../../trueeffectsfrontend/build.zip"
# }