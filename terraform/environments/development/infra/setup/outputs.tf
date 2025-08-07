output "acr_repo_main" {
  description = "ACR repository URL for app"
  value       = azurerm_container_registry.main.login_server
}

# output "acr_repo_proxy" {
#   description = "ACR repository URL for proxy"
#   value       = azurerm_container_registry.proxy.login_server
# }