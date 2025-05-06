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

output "te_vnet_name" {
  value = azurerm_virtual_network.te_vnet.name
}

output "te_container_apps_subnet_name" {
  value = azurerm_subnet.te_container_apps_subnet.name
}

output "te_db_subnet" {
  value = azurerm_subnet.te_db_subnet.name
}

output "te_cache_subnet_name" {
  value = azurerm_subnet.te_cache_subnet.name
}

output "db_link_name" {
  value = azurerm_private_dns_zone_virtual_network_link.db_link.name
}
