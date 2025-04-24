output "te_container_apps_subnet_id" {
  value = azurerm_subnet.te_container_apps_subnet.id
}
output "te_db_subnet_id" {
  value = azurerm_subnet.te_db_subnet.id
}
output "te_private_dns_zone_db_id" {
  value = azurerm_private_dns_zone.db.id
}

output "te_cache_subnet_id" {
  value = azurerm_subnet.te_cache_subnet.id
}