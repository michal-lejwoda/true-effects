output "acr_repo_app" {
  description = "ACR repository URL for app"
  value       = azurerm_container_registry.app.login_server
}

output "acr_repo_proxy" {
  description = "ACR repository URL for proxy"
  value       = azurerm_container_registry.proxy.login_server
}