output "te_redis_name" {
  value = azurerm_redis_cache.redis.name
}

output "te_postgres_name" {
  value = azurerm_postgresql_flexible_server.db.name
}

output "db_fqdn" {
  value = azurerm_postgresql_flexible_server.db.fqdn
}

output "redis_hostname" {
  value = azurerm_redis_cache.redis.hostname
}

output "redis_primary_key" {
  value     = azurerm_redis_cache.redis.primary_access_key
  sensitive = true
}

